document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const contentDiv = document.getElementById("content");
  const styleSheet = document.getElementById("dynamicStyles");
  const tagList = ["Audio", "Video", "Hybrid"];
  const suggestionBox = document.getElementById("tag-suggestions");

  // Fetch the JSON data from the file
  fetch('/Assets/JSON/mainCards.JSON')
    .then(response => response.json())
    .then(cards => {
      // Iterate over the fetched cards
      cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.id = card.id;
        cardDiv.innerHTML = `
          <h2>${card.title}</h2>
          <p>${card.description}</p>
        `;

        // Set data-tags for filtering
        cardDiv.setAttribute("data-tags", card.tags.join(","));

        const container = card.link
          ? (() => {
              const a = document.createElement("a");
              a.href = card.link;
              a.appendChild(cardDiv);
              return a;
            })()
          : cardDiv;

        contentDiv.appendChild(container);

        // Add dynamic CSS
        styleSheet.innerHTML += `
        #${card.id} {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${card.backgroundImage}');
          background-position: center;
          background-size: 200%;
          background-repeat: no-repeat;
          transition: all 0.4s ease-in-out;
        }
        #${card.id}:hover {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${card.backgroundImage}');
          background-position: center;
          transform: scale(1.05);
          background-size: 130%;
          transition: all 0.9s ease-in-out;
        }
        `;
      });

      // FILTER FUNCTION
      searchInput.addEventListener("input", (e) => {
        const cursorPos = searchInput.selectionStart;
        const value = searchInput.value;

        // Find the last hashtag being typed
        const beforeCursor = value.slice(0, cursorPos);
        const match = beforeCursor.match(/#(\w*)$/);

        if (match) {
          const searchTag = match[1].toLowerCase();
          const filteredTags = tagList.filter(tag =>
            tag.toLowerCase().startsWith(searchTag)
          );

          // Show suggestions
          if (filteredTags.length > 0) {
            suggestionBox.innerHTML = "";
            filteredTags.forEach(tag => {
              const div = document.createElement("div");
              div.textContent = "#" + tag;
              div.addEventListener("click", () => {
                // Replace the #tag in input
                const newText = value.replace(/#(\w*)$/, `#${tag} `);
                searchInput.value = newText;
                suggestionBox.style.display = "none";
                searchInput.focus();
                filterCards();
              });
              suggestionBox.appendChild(div);
            });

            const rect = searchInput.getBoundingClientRect();
            suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
            suggestionBox.style.left = `${rect.left + window.scrollX}px`;
            suggestionBox.style.display = "block";
          } else {
            suggestionBox.style.display = "none";
          }
        } else {
          suggestionBox.style.display = "none";
        }

        filterCards();
      });

      // Filter the cards based on search input
      function filterCards() {
        const searchText = searchInput.value.trim().toLowerCase();
        const allCards = Array.from(document.querySelectorAll("#content > *"));

        allCards.forEach(container => {
          const card = container.querySelector(".card");
          if (!card) return;

          const title = card.querySelector("h2").textContent.toLowerCase();
          const tags = card.getAttribute("data-tags").toLowerCase();

          // Check if there's a #tag in the search
          const tagMatches = Array.from(searchText.matchAll(/#(\w+)/g)).map(m => m[1]);

          const matchesTitle = title.includes(searchText.replace(/#\w+/g, "").trim());
          const matchesTags = tagMatches.length === 0 || tagMatches.some(tag => tags.includes(tag));

          container.style.display = (matchesTitle && matchesTags) ? "block" : "none";
        });
      }

      // Hide suggestions on click outside
      document.addEventListener("click", (e) => {
        if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
          suggestionBox.style.display = "none";
        }
      });
    })
    .catch(error => {
      console.error("Error loading the JSON file:", error);
    });
});
