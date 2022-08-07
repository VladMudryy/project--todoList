'strict mode';

window.addEventListener('DOMContentLoaded', () => {

    // Creating new todo

    const input = document.querySelector('.add-item__input'),
          inputSection = document.querySelector('.add-item'),
          itemListParent = document.querySelector('.items__list'),
          itemQty = document.querySelector('.items__footer span'),
          itemsFilter = document.querySelectorAll('.items__footer li'),
          itemsClear = document.querySelector('.items__clear');
          
    class TodoItem {
        constructor(text, isComplete = false, className = 'item', classParent = '.items__list') {
            this.text = text;
            this.isComplete = isComplete;
            this.className = className;
            this.parent = document.querySelector(classParent);
        }

        render() {
            const todoCard = document.createElement('div');
            todoCard.classList.add(this.className);
            if (this.isComplete === true) {
                todoCard.classList.add('item-checked');
            }
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

    // Load todos from localStorage

    const arrayOfTodos = [],
          arrayOfLocal = [];

    if (JSON.parse(localStorage.getItem('Todo-list'))) {
        JSON.parse(localStorage.getItem('Todo-list')).forEach(item => {
            arrayOfLocal.push(item);
        });
    }

    localStorage.clear();
    arrayOfLocal.forEach(item => {
        itemListParent.innerHTML = '';
        createTodos(item.text, item.isComplete);
    });

    // Add todos

    function createTodos(text, status = false) {
        arrayOfTodos.push(new TodoItem(
            text,
            status
            ));
        input.value = '';

        arrayOfTodos.forEach(item => {
            item.render();
        });
        itemQty.textContent = arrayOfTodos.length;
        localStorage.setItem('Todo-list', JSON.stringify(arrayOfTodos)); 
        
        const allItems = document.querySelectorAll('.item');
        allItems.forEach(item => {
        if (item.classList.contains('item-checked')) {
            item.firstElementChild.firstElementChild.checked = true;
            item.firstElementChild.lastElementChild.classList.add('text-line');
        }
        itemsFilter.forEach(item => {
            item.classList.remove('on');
        });
        itemsFilter[0].classList.add('on');
    });
    }

    input.addEventListener('keypress', event => {
        if (event.key === 'Enter' && input.value != '' && !input.value.match(/'^ *$'/)) {
            itemListParent.innerHTML = '';
                createTodos(input.value);
        }
    });

    inputSection.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;
        if (target && target.classList.contains('add-submit') && input.value != '' && !input.value.match(/'^ *$'/)) {
            itemListParent.innerHTML = '';
            createTodos(input.value);
        }
    });

    // Delete todo

    function removeTodo(index) {
        arrayOfTodos.splice(index, 1);
        localStorage.setItem('Todo-list', JSON.stringify(arrayOfTodos));
    }

    itemListParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('checkbox__img')) {
            removeTodo([...document.querySelectorAll('.item')].indexOf(target));
            target.parentElement.remove();
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

    itemListParent.addEventListener('change', event => {
        const target = event.target;
        if (target && target.classList.contains('checkbox__input')) {
            if (target.checked === true) {
                isCheckedTrue([...document.querySelectorAll('.item')].indexOf(target.parentElement.parentElement));
                localStorage.setItem('Todo-list', JSON.stringify(arrayOfTodos));
            } else if (target.checked === false) {
                isCheckedFalse([...document.querySelectorAll('.item')].indexOf(target.parentElement.parentElement));
                localStorage.setItem('Todo-list', JSON.stringify(arrayOfTodos));
            }
        }
    });

    // Items filter (all/active/cpmpleted)

    itemsFilter[0].classList.add('on');

    itemsFilter.forEach((item, i) => {
        item.addEventListener('click', event => {
            itemsFilter.forEach(item => {
                item.classList.remove('on');
            });
            item.classList.add('on');
            switch (event.target.id) {
                case 'all': 
                    document.querySelectorAll('.item').forEach(item => {
                        item.classList.remove('hide');
                    });
                    break;
                case 'active':
                    document.querySelectorAll('.item').forEach(item => {
                        item.classList.remove('hide');
                        if (item.classList.contains('item-checked') !== false) {
                            item.classList.add('hide');
                        }
                    });
                    break;
                case 'completed':
                    document.querySelectorAll('.item').forEach(item => {
                        item.classList.remove('hide');
                        if (item.classList.contains('item-checked') !== true) {
                            item.classList.add('hide');
                        }
                    });
                    break;
            }
        });
    });

    // Clear all

    itemsClear.addEventListener('click', event => {
        itemListParent.innerHTML = '';
        arrayOfTodos.splice(0, arrayOfTodos.length);
        localStorage.clear();
    });
});