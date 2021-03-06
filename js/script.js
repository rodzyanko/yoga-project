/*jshint esversion: 6 */
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
                failure: "Что-то пошло не так"
            };

            let form = document.querySelector('.main-form'),
                input = document.getElementsByTagName('input'),
                statusMessage = document.createElement('div'),
                formBottom = document.getElementById('form');
                 statusMessage.classList.add('status');

            function sendForm(elem){
                elem.addEventListener('submit', function(e){
                    e.preventDefault();
                    elem.appendChild(statusMessage);
                    
                    let formData = new FormData(elem);

                    function postData(data){

                        return new Promise(function(resolve, reject){
                            let request = new XMLHttpRequest();
                            request.open('POST', 'server.php');
                            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                            request.onreadystatechange = function(){
                                if (request.readyState < 4){
                                    resolve();
                                } else if (request.readyState === 4){
                                    if (request.status == 200 && request.status < 300){
                                        resolve();
                                    }
                                    else {
                                        reject();
                                    }
                                }

                            };
                            request.send(data);

                        });
                    }

                    // конец PostData

                    function clearInput(){
                        for(let i = 0; i < input.length; i++){
                            input[i].value = '';
                
                        }
                    }

                    postData(formData)
                    .then(()=> statusMessage.innerHTML = message.loading)
                    .then(()=> statusMessage.innerHTML = message.success)
                    .catch(()=> statusMessage.innerHTML = message.failure)
                    .then(clearInput);


                });
            }

                sendForm(form);
                sendForm(formBottom);

                // Slider

                let slideIndex = 1,
                slides = document.querySelectorAll('.slider-item'),
                prev = document.querySelector('.prev'),
                next = document.querySelector('.next'),
                dotsWrap = document.querySelector('.slider-dots'),
                dots = document.querySelectorAll('.dot');

                showSlides(slideIndex);

                function showSlides(n){
                    if (n > slides.length){
                        slideIndex = 1;
                    }
                    if (n < 1){
                        slideIndex = slides.length;
                    }
                    slides.forEach((item) => item.style.display = 'none');
                    dots.forEach((item) => item.classList.remove('dot-active'));
                    slides[slideIndex - 1].style.display = 'block';
                    dots[slideIndex - 1].classList.add('dot-active');

                }

                function plusSlides(n){
                    showSlides(slideIndex += n);
                }

                function currentSlide(n){
                    showSlides(slideIndex = n);
                }

                prev.addEventListener('click', function(){
                    plusSlides(-1);
                });

                next.addEventListener('click', function(){
                    plusSlides(1);
                });

                dotsWrap.addEventListener('click', function(event){
                    for (let i = 0; i < dots.length + 1; i++){
                        if (event.target.classList.contains('dot') && event.target == dots[i - 1]){
                            currentSlide(i);
                        }
                    }
                    
                });
            
                //Калькулятор

                let persons = document.querySelectorAll('.counter-block-input')[0],
                    days = document.querySelectorAll('.counter-block-input')[1],
                    place = document.getElementById('select'),
                    totalValue = document.getElementById('total'),
                    personsSum = 0,
                    daysSum = 0,
                    total = 0;

                    totalValue.innerHTML = 0;

                    persons.addEventListener('change', function(){
                        personsSum = +this.value;
                        total = (personsSum + daysSum) * 4000;

                        if (days.value == '' || persons.value == ''){
                            totalValue.innerHTML = 0;
                        } else {
                            totalValue.innerHTML = total; 
                        }

                    });

                    days.addEventListener('change', function(){
                        daysSum = +this.value;
                        total = (personsSum + daysSum) * 4000;

                        if (days.value == '' || persons.value == ''){
                            totalValue.innerHTML = 0;
                        }    
                        else {
                            totalValue.innerHTML = total;
                        }

                    });

                    place.addEventListener('change', function(){
                        if (days.value == '' || persons.value == ''){
                            totalValue.innerHTML = 0;

                        } else {
                            let a = total;
                            totalValue.innerHTML = a * (this.options[this.selectedIndex].value);
                        }

                    });






        });

