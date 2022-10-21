'use strict';

(() => {
    const fieldMap = {
        companyName: '#company-name',
        firstDay: '#first-day',
        containerWidth: '#container-width',
        homepage: '#homepage',
        indentSize: '#indent-size',
        personalCode1: '#personal-code-1',
        personalCode2: '#personal-code-2',
        personalCode3: '#personal-code-3'
    };

    const loadInfo = () => {
        const formData = localStorage.getItem('form-data');
        if (formData !== null) {
            let json = {};
            
            try {
                json = JSON.parse(formData);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    return;
                }
                throw e;
            }

            Object.keys(fieldMap).forEach(e => {
                if (typeof json[e] === 'string' || typeof json[e] === 'number') {
                    const selector = document.querySelector(fieldMap[e]);
                    if (selector) {
                        selector.value = json[e];
                    }
                }
            });

            document.querySelector('#theme-dark').checked = (typeof json.isDarkTheme === 'boolean') && json.isDarkTheme;
            applyTheme();
        }
    };


    const saveInfo = () => {
        let json = {};

        Object.keys(fieldMap).forEach(e => {
            const selector = document.querySelector(fieldMap[e]);
            if (selector && selector.value) {
                json[e] = selector.value;
            }
        });

        json.isDarkTheme = document.querySelector('#theme-dark').checked;

        localStorage.setItem('form-data', JSON.stringify(json));
        applyTheme();
    };

    const clearInfo = () => {
        localStorage.clear();
        
        Object.keys(fieldMap).forEach(e => {
            const selector = document.querySelector(fieldMap[e]);
            if (selector) {
                selector.value = "";

                if (selector.tagName && selector.tagName.toLowerCase() === 'select') {
                    selector.selectedIndex = 0;
                }
            }
        });

        document.querySelector('#theme-light').checked = true;
    };

    const applyTheme = () => {
        document.querySelector('body').setAttribute('data-theme', document.querySelector('#theme-dark').checked ? 'dark' : 'light');
        const selected = document.querySelector('#container-width').value;
        if (selected === 'fixed') {
            document.querySelector('.content').classList.remove('flex');
        } else {
            document.querySelector('.content').classList.add('flex');
        }
    };


    addEventListener('DOMContentLoaded', () => {
        loadInfo();
        
        document.querySelector('#apply-button').addEventListener('click', saveInfo);
        document.querySelector('#cancel-button').addEventListener('click', clearInfo);
    });
})();