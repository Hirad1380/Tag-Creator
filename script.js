const input = document.querySelector('input');
const text_area = document.querySelector('.text-area');
const tags_container = document.querySelector('.tags');
const deleteAllButton = document.getElementById('btn');

text_area.addEventListener('click', () => {
    text_area.classList.add('focused');
    input.focus();
});

function create_span(span_text) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.innerText = span_text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'x';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
        span.remove();
        deleteButton.remove();
        if (tags_container.children.length === 0) {
            deleteAllButton.style.display = 'none';
        }
    });

    tags_container.append(deleteButton);
    tags_container.append(span);

    if (tags_container.children.length > 0) {
        deleteAllButton.style.display = 'inline-block';
    }
}

deleteAllButton.addEventListener('click', () => {
    const tags = document.querySelectorAll('.tags span');
    const buttonremoves = document.querySelectorAll('.tags button');
    buttonremoves.forEach(buttonremove => buttonremove.remove());
    tags.forEach(tag => tag.remove());
    deleteAllButton.style.display = 'none';
});

function handleInputChange() {
    const inputValue = input.value;
    if (inputValue === '') {
        input.addEventListener('blur', () => {
            if (tags_container.innerText == '') {
                text_area.classList.remove('focused');
            } else {
                text_area.classList.add('focused');
            }
        });
    }
}

function handleKeyUp(e) {
    if (e.code == 'Enter') {
        if(input.value != ''){
            if (input.value.includes(',')) {
                const values = input.value.split(',').map(v => v.trim()).filter(v => v);
                values.forEach(value => create_span(value));
                input.value = '';
            }
            else {
                create_span(input.value.trim());
                input.value = '';
            }
        }        
    }
}

function handleKeyDown(e) {
    switch (e.key) {
        case 'Tab':
            handleTabKey(e);
            break;
        case 'Backspace':
            handleBackspaceKey();
            break;
    }
}

function handleTabKey(e) {
    if (tags_container.innerText === '') {
        if (input.value !== '') {
            input.value = '';
            e.preventDefault();
        } else {
            e.preventDefault();
        }
    } else {
        if (input.value !== '') {
            input.value = '';
        } else {
            e.preventDefault();
        }
    }
}

function handleBackspaceKey() {

    if (input.value === ''){
        const tags = document.querySelectorAll('.tags span');
        const buttons = document.querySelectorAll('.tags button');

        const lastTag = tags[tags.length - 1];
        const btn_remove = buttons[buttons.length - 1];

        if (lastTag && btn_remove) {
            lastTag.remove();
            btn_remove.remove();
            if (tags_container.children.length === 0) {
                deleteAllButton.style.display = 'none';
                input.addEventListener('blur', () => {
                    if (tags_container.innerText == '') {
                        text_area.classList.remove('focused');
                    }
                });
            }
        }
    }
}

input.addEventListener('input', handleInputChange);
input.addEventListener('blur', handleInputChange);
input.addEventListener('keyup', handleKeyUp);
input.addEventListener('keydown', handleKeyDown);