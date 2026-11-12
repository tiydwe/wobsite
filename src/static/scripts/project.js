const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('project-select');
const container = document.getElementById('project-grid-container');
const noResults = document.getElementById('project-nothing-found');
const items = Array.from(container.getElementsByClassName('project-grid-item'));

function updateList() {
  const searchTerm = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;

  items.sort((a, b) => {
    const nameA = a.dataset.name.toLowerCase();
    const nameB = b.dataset.name.toLowerCase();
    const dateA = new Date(a.dataset.date);
    const dateB = new Date(b.dataset.date);

    if (sortBy === 'newest') return dateB - dateA;
    if (sortBy === 'oldest') return dateA - dateB;
  });

  var cntValid = 0;
  items.forEach(item => {
    const name = item.dataset.name.toLowerCase();

    if (!name.includes(searchTerm)
        || (sortBy == 'complete' && item.dataset.tag != 'complete')
        || (sortBy == 'in-progress' && item.dataset.tag != 'in-progress')) {
      item.style.display = 'none';
    }
    else {
      item.style.display = 'block';
      ++cntValid;
    }

    container.appendChild(item);
  });
  if (cntValid == 0) {
    noResults.style.display = "block";
  }
  else {
    noResults.style.display = "none";
  }
}

searchInput.addEventListener('input', updateList);
sortSelect.addEventListener('change', updateList);
updateList();