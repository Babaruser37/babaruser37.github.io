async function loadHelpTopics(path) {
  try {
    const response = await fetch(path);
    const helpTopics = await response.json();
    const helpContent = document.getElementById('help-content');

    helpTopics.forEach(topic => {
      const topicTitle = document.createElement('h3');
      topicTitle.textContent = topic.title;
      helpContent.appendChild(topicTitle);

      const section = document.createElement('div');
      section.className = 'SpecificHelpContent';

      topic.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';

        const stepTitle = document.createElement('h3');
        stepTitle.textContent = `Step ${index + 1}`;
        stepDiv.appendChild(stepTitle);

        if (typeof step === 'string') {
          const p = document.createElement('p');
          p.textContent = step;
          stepDiv.appendChild(p);
        } else if (typeof step === 'object') {
          const p = document.createElement('p');
          p.innerHTML = step.content;
          stepDiv.appendChild(p);

          if (step.list) {
            const ol = document.createElement('ol');
            step.list.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              ol.appendChild(li);
            });
            stepDiv.appendChild(ol);
          }

          if (step.note) {
            const noteP = document.createElement('p');
            noteP.innerHTML = `<strong>Note:</strong> ${step.note}`;
            stepDiv.appendChild(noteP);
          }
        }

        section.appendChild(stepDiv);
      });

      helpContent.appendChild(section);
    });
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}
    
loadHelpTopics("Assets/JSON/{equipment_id}TB.json");   