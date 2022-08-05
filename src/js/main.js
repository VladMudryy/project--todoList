'strict mode';

window.addEventListener('DOMContentLoaded', () => {
    // Creating new todo

    const input = document.querySelector('.add-item__input'),
        inputSection = document.querySelector('.add-item');

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
                    <input type="checkbox" checked="checked">
                    <span class="checkmark"></span>
                    <div>${this.text}</div>   
                </label>
                <img src="./assets/img/icons/close_white.png" alt="close">
            `;
            this.parent.append(todoCard);
        }
    }

    new TodoItem(
        'first',
        'item',
        '.items__list'
    ).render();

    // input 

    input.addEventListener('keypress', event => {
        if (event.key === 'Enter' && input.value != '' && !input.value.match(/'^ *$'/)) {
            new TodoItem(
                input.value,
                'item',
                '.items__list'
                ).render();

            input.value = '';
        }
    });

    inputSection.addEventListener('click', event => {
        event.preventDefault();
        if (event.target && event.target.classList.contains('add-submit') && input.value != '' && !input.value.match(/'^ *$'/)) {
            new TodoItem(
                input.value,
                'item',
                '.items__list'
                ).render();

            input.value = '';
        }
    });
    






















});