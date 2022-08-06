'strict mode';

window.addEventListener('DOMContentLoaded', () => {
    // Creating new todo

    const input = document.querySelector('.add-item__input'),
          inputSection = document.querySelector('.add-item'),
          listParent = document.querySelector('.items__list');
          
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
                    <div>${this.text}</div>   
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
        }
    });
    
    // Completed Todo

    listParent.addEventListener('change', event => {
        if (event.target && event.target.classList.contains('checkbox__input')) {
            if (event.target.checked === true) {
                event.target.parentElement.lastChild.style.textDecoration = 'line-through';
            }
        }
    });






















});