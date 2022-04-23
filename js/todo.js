const input = document.getElementById('input');
const ul = document.querySelector('.items');
updateEventListeners();
input.addEventListener('keydown', (e) => {
    const noLineBreaks = input.value.replace(/(\r\n|\n|\r| )/gm, '');
    const brValue = input.value.replace(/(\r\n|\n|\r)/gm, '<br />');
    if (e.key === 'Enter' && !e.shiftKey && noLineBreaks != '') {
        e.preventDefault();
        createListItem(brValue);
        input.value = '';
        updateEventListeners();
    }
});
function updateEventListeners() {
    document.querySelectorAll('.item').forEach((item) => {
        item.addEventListener('click', (event) => {
            const target = event.currentTarget;
            target.remove();
        });
    });
}
function createListItem(x) {
    let listItem = `<li class="item"><div class="item-content">${x}</div><div class="item-warning">Remove?</div></li>`;
    ul.insertAdjacentHTML('beforeend', listItem);
    let arrayedContent = Array.from(document.querySelectorAll('.item-content'));
    arrayedContent.forEach((item) => {
        localStorage.setItem('Item', item.innerHTML);
    });
}
