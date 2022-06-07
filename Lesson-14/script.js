var pageContentDiv = document.createElement('div'),
    btn = document.createElement('button'),
    mainBlockDiv = document.createElement('div'),
    userTabsDiv = document.createElement('div'),
    infoBlockDiv = document.createElement('div'),
    textDiv = document.createElement('div');

document.body.appendChild(pageContentDiv);
pageContentDiv.appendChild(btn);
pageContentDiv.appendChild(mainBlockDiv);
mainBlockDiv.appendChild(userTabsDiv);
mainBlockDiv.appendChild(infoBlockDiv);

pageContentDiv.className = 'page-content';
userTabsDiv.className = 'user-tabs';
infoBlockDiv.className = 'info-block';
infoBlockDiv.style.display = 'none';

btn.textContent = 'Get Users List';
btn.style.background = '#00ff33';

var btns = document.getElementsByTagName('button');

var image = document.createElement('img');
infoBlockDiv.appendChild(image);
infoBlockDiv.appendChild(textDiv);

var firstName = document.createElement('span');
textDiv.appendChild(firstName);

var lastName = document.createElement('span');
textDiv.appendChild(lastName);

textDiv.className = 'style-text';

btns[0].addEventListener('click', function () {
    var storageUsersKey = 'All users:';

    if (localStorage.getItem(storageUsersKey) == null) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
        xhr.send();

        xhr.onload = function () {
            var statusType = this.status;
            try {
                var users = JSON.parse(this.response).data;

                localStorage.setItem(storageUsersKey, JSON.stringify(users));

                showUsers(users);
            } catch (error) {
                console.log('возникло исключение!');
                var blockError = document.createElement('div');
                document.body.appendChild(blockError);
                blockError.className = 'block-error';
                blockError.innerHTML =
                    'Произошла ошибка! Данные не получены! Ошибка: ' +
                    statusType;
            }
            xhr.onerror = function (error) {
                console.error(this.status);
            };
            xhr.onloadend = function () {
                console.log('Запрос завершен');
            };
        };
    } else {
        var users = JSON.parse(localStorage.getItem(storageUsersKey));
        showUsers(users);
    }
});

function showUsers(users) {
    infoBlockDiv.style.display = 'flex';

    var userBtnArray = [];
    userTabsDiv.innerHTML = '';

    for (var i = 0; i < users.length; i++) {
        var userBtn = document.createElement('button');
        userBtn.className = 'user-btns';
        userBtn.textContent = 'User ' + (users[i].id - 6);

        userBtnArray.push(userBtn);
        userTabsDiv.appendChild(userBtn);

        (function () {
            var user = users[i];

            userBtn.addEventListener(
                'click',
                function () {
                    for (var i = 0; i < userBtnArray.length; i++) {
                        userBtnArray[i].classList.remove('user-btns-change');
                    }
                    event.target.classList.add('user-btns-change');
                    showUserInfo(user, event.target);
                },
                false
            );
        })();
    }

    showUserInfo(users[0], userBtnArray[0]);

    function showUserInfo(user, firstBtn) {
        firstBtn.classList.add('user-btns-change');

        image.src = user.avatar;
        image.className = 'image';

        firstName.innerHTML = 'First Name: ' + user.first_name;
        lastName.innerHTML = 'Last Name: ' + user.last_name;
    }
}
