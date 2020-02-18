window.addEventListener('DOMContentLoaded', () => {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab');
    let tabContent = document.querySelectorAll('.info-tabcontent');
    let infoHeader = document.querySelector('.info-header');

        function hideContent(a) {
            for (let i = a; i < tabContent.length; i++){
                    tabContent[i].classList.remove('show');
                    tabContent[i].classList.add('hide');
            }
    }

    hideContent(1);

        function showContent(b){
            if (tabContent[b].classList.contains('hide')){
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

    infoHeader.addEventListener('click', function(event){
        let target = event.target;
        if (target.classList.contains('info-header-tab')){
            for (let i = 0; i < tab.length; i++){
                if (tab[i] == target){
                    hideContent(0);
                    showContent(i);
                }
            }
        }
    });

        // Таймер

        let deadline = '2020-02-20';

        function getTimeBefore(endtime){
            let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000/ 60) % 60),
            hours = Math.floor(t / (1000*60*60));


            return {
                'total': t,
                'seconds': seconds,
                'minutes': minutes,
                'hours': hours
            };

        }

        function setTimer(id, endtime){
            let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(refreshTimer, 1000);

            function refreshTimer(){
               let t = getTimeBefore(endtime);

               function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            }
            
               hours.textContent = addZero(t.hours);
               minutes.textContent = addZero(t.minutes);
               seconds.textContent = addZero(t.seconds);


               if (t.total <= 0){
                   clearInterval(timeInterval);
                   hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';
               }

            }


        }

        setTimer('timer', deadline);

        // Модальное окно

        let more = document.querySelector('.more'),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close'),
            descriptionMore = document.querySelectorAll('.description-btn');

            function goModal(){
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            }

            more.addEventListener('click', goModal);

            for (let i = 0; i <descriptionMore.length; i++){
                descriptionMore[i].addEventListener('click', goModal);
            }
            

            close.addEventListener('click', () => {
                overlay.style.display = 'none';
                more.classList.remove('more-splash');
                document.body.style.overflow = '';

            });

            // Форма

            let message = {
                loading: "Загрузка...",
                success: "Спасибо, скоро мы с вами свяжемся",
                failure: "Что-то пошло не так o_O"
            };

            let form = document.querySelector('.main-form'),
                input = form.getElementsByTagName('input'),
                statusMessage = document.createElement('div'),
                contactForm = document.getElementById('form');

            statusMessage.classList.add('status');

            function setForm(formName){
                formName.addEventListener('submit', function(event) {
                    event.preventDefault();
                    formName.appendChild(statusMessage);
    
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
                    let formData = new FormData(formName);
    
                    let obj = {};
                    formData.forEach(function(value, key){
                        obj[key] = value;
                    });
    
                    let json = JSON.stringify(obj);
    
                    request.send(json);
    
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState < 4){
                            statusMessage.innerHTML = message.loading;
                        } else if (request.readyState === 4 && request.status == 200){
                            statusMessage.innerHTML = message.success;
                        } else {
                            statusMessage.innerHTML = message.failure;
                        }
                    });
    
                    for (let i = 0; i < input.length; i++){
                        input[i].value = '';
                    }
    
    
                });

            }

            setForm(form);
            setForm(contactForm);


            

            // form.addEventListener('submit', function(event) {
            //     event.preventDefault();
            //     form.appendChild(statusMessage);

            //     let request = new XMLHttpRequest();
            //     request.open('POST', 'server.php');
            //     request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            //     let formData = new FormData(form);

            //     let obj = {};
            //     formData.forEach(function(value, key){
            //         obj[key] = value;
            //     });

            //     let json = JSON.stringify(obj);

            //     request.send(json);

            //     request.addEventListener('readystatechange', () => {
            //         if (request.readyState < 4){
            //             statusMessage.innerHTML = message.loading;
            //         } else if (request.readyState === 4 && request.status == 200){
            //             statusMessage.innerHTML = message.success;
            //         } else {
            //             statusMessage.innerHTML = message.failure;
            //         }
            //     });

            //     for (let i = 0; i < input.length; i++){
            //         input[i].value = '';
            //     }


            // });






   



});

