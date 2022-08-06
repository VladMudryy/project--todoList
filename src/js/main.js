'strict mode';

window.addEventListener('DOMContentLoaded', () => {
    // Creating new todo

    const input = document.querySelector('.add-item__input'),
          inputSection = document.querySelector('.add-item'),
          listParent = document.querySelector('.items__list'),
          itemQty = document.querySelector('.items__footer span'),
          itemsFilter = document.querySelectorAll('.items__footer li'),
          itemsClear = document.querySelector('.items__clear');
          
    class TodoItem {
        constructor(text, className, classParent, isComplete = false) {
            this.text = text;
            this.isComplete = isComplete;
            this.className = className;
            this.parent = document.querySelector(classParent);
        }

        render() {
            const todoCard = document.createElement('div');
            todoCard.classList.add(this.className); 
            todoCard.innerHTML = `
                <label class="checkbox__container">
                    <input class="checkbox__input" type="checkbox">
                    <span class="checkmark"></span>
                    <div class="checkbox__text">${this.text}</div>   
                </label>
                <img class="checkbox__img" src="./assets/img/icons/close_white.png" alt="close">
            `;
            this.parent.append(todoCard);
        }
    }

    // input 

    const arrayOfTodos = [];

    function createTodos() {
        arrayOfTodos.push(new TodoItem(
            input.value,
            'item',
            '.items__list'
            ));
        input.value = '';

        arrayOfTodos.forEach(item => {
            item.render();
        });
        itemQty.textContent = arrayOfTodos.length;
    }

    input.addEventListener('keypress', event => {
        if (event.key === 'Enter' && input.value != '' && !input.value.match(/'^ *$'/)) {
            listParent.innerHTML = '';
                createTodos();
        }
    });

    inputSection.addEventListener('click', event => {
        event.preventDefault();
        if (event.target && event.target.classList.contains('add-submit') && input.value != '' && !input.value.match(/'^ *$'/)) {
            listParent.innerHTML = '';
            createTodos();
        }
    });

    // Delete todo

    function removeTodo(index) {
        arrayOfTodos.splice(index, 1);
    }

    listParent.addEventListener('click', event => {
        if (event.target && event.target.classList.contains('checkbox__img')) {
            removeTodo([...document.querySelectorAll('.item')].indexOf(event.target));
            event.target.parentElement.remove();
            itemQty.textContent = arrayOfTodos.length;
        }
    });
    
    // Completed Todo

    function isCheckedTrue(index) {
        arrayOfTodos[index].isComplete = true;
        const todoBlock = document.querySelectorAll('.item');
        todoBlock[index].firstElementChild.lastElementChild.classList.add('text-line');
        todoBlock[index].classList.add('item-checked');        
    }

    function isCheckedFalse(index) {
        arrayOfTodos[index].isComplete = false;
        const todoBlock = document.querySelectorAll('.item');
        todoBlock[index].firstElementChild.lastElementChild.classList.remove('text-line');
        todoBlock[index].classList.remove('item-checked'); 
    }

    listParent.addEventListener('change', event => {
        if (event.target && event.target.classList.contains('checkbox__input')) {
            if (event.target.checked === true) {
                isCheckedTrue([...document.querySelectorAll('.item')].indexOf(event.target.parentElement.parentElement));
            } else if (event.target.checked === false) {
                isCheckedFalse([...document.querySelectorAll('.item')].indexOf(event.target.parentElement.parentElement));
            }
        }
    });

    // items filter (all/active/cpmpleted)

    itemsFilter[0].classList.add('on');

    itemsFilter.forEach((item, i) => {
        item.addEventListener('click', event => {
            itemsFilter.forEach(item => {
                item.classList.remove('on');
            });
            item.classList.add('on');
            if (event.target.id === 'all') {
                document.querySelectorAll('.item').forEach(item => {
                    console.log(item);
                    item.classList.remove('hide');
                });
            } else if (event.target.id === 'active') {
                document.querySelectorAll('.item').forEach(item => {
                    item.classList.remove('hide');
                    if (item.classList.contains('item-checked') !== false) {
                        item.classList.add('hide');
                    }
                });
            } else if (event.target.id === 'completed') {
                document.querySelectorAll('.item').forEach(item => {
                    item.classList.remove('hide');
                    if (item.classList.contains('item-checked') !== true) {
                        item.classList.add('hide');
                    }
                });
            }
        });
    });

    // Clear all

    itemsClear.addEventListener('click', event => {
        listParent.innerHTML = '';
        arrayOfTodos.splice(0, arrayOfTodos.length);
    });




















});