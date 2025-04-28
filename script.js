const cards = [
  {
    id: "YamahaMixer",
    title: "Yamaha Mixer",
    description: "The Mixer we use for our biggest events and GH events.",
    backgroundImage: "https://www.stjohnsmusic.com/32045-superlarge_default/yamaha-digital-mixing-console-tf1.jpg",
    link: "/YamahaMixer.html",
    tags: ["Audio"]
  },
  {
    id: "SoundCraftMixer",
    title: "Soundcraft Mixer",
    description: "The digital soundcraft Mixer.",
    backgroundImage: "https://shop.solotech.com/cdn/shop/products/SI-EXPRESSION-1.jpg?v=1582333438",
    link: "/SoundCraftMixer.html",
    tags: ["Audio"]
  },
  {
    id: "StreamCart",
    title: "Stream Cart",
    description: "One of the 2 carts we use for streaming.",
    backgroundImage: "https://www.bhphotovideo.com/cdn-cgi/image/fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/switchblade_systems_swbs_mpc_t2_mobile_production_cart_tier_1674747628_1744865.jpg",
    link: "/StreamCart.html",
    tags: ["Hybrid"]
  },
  {
    id: "Blackmagic",
    title: "Blackmagic ATEM Mini",
    description: "The Blackmagic ATEM Mini Pro is a powerful video switcher.",
    backgroundImage: "https://cdn.mos.cms.futurecdn.net/AytuYuPKz7rmP7xXH5t8Hj.jpg",
    link: "/Blackmagic.html",
    tags: ["Video"]
  },
  {
    id: "Focusrite",
    title: "Focusrite",
    description: "Focusrite Scarlett 2i2 is a USB audio interface.",
    backgroundImage: "https://stevesmusic.com/cdn/shop/files/2274.jpg?v=1712293081&width=5760",
    link: "/Focusrite.html",
    tags: ["Hybrid"]
  },
  {
    id: "SennheiserG3",
    title: "Sennheiser G3 Mic",
    description: "The oldest Sennheiser mics we have.",
    backgroundImage: "https://5.imimg.com/data5/YV/BW/MY-3396797/sennheiser-ew100-g3-500x500.jpg",
    link: "/SennheiserG3.html",
    tags: ["Audio"]
  },
  {
    id: "SennheiserG4",
    title: "Sennheiser G4 Mic",
    description: "The newest Sennheiser mics we have.",
    backgroundImage: "https://cdn11.bigcommerce.com/s-2j5x3/images/stencil/1280x1280/products/103/1041/Sennheiser-EW-100-G4-ME2-A-Wireless-Microphone-System__19595.1565886487.jpg?c=1",
    link: "/SennheiserG4.html",
    tags: ["Audio"]
  },
  {
    id: "SonyCamera",
    title: "Sony PXW-Z90V",
    description: "The one and only standard camera.",
    backgroundImage: "https://m.media-amazon.com/images/I/71XerFfukkL.jpg",
    link: "/SonyCamera.html",
    tags: ["Video"]
  },
  
  // Add more cards as needed...
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const contentDiv = document.getElementById("content");
  const styleSheet = document.getElementById("dynamicStyles");
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
  
  const tagList = ["Audio", "Video", "Hybrid"];
  const suggestionBox = document.getElementById("tag-suggestions");
  
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
  
  // Hide suggestions on click outside
  document.addEventListener("click", (e) => {
    if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
      suggestionBox.style.display = "none";
    }
  });
  
  
  
  
});
