/**
 * Created by fronty on 13/03/17.
 */

// в качестве аргумента передаем либо элемент для подстановки в строку поиска ({element: 'selector'})
// либо строку ({string: 'string'})
$.fn.geopicker = function(options) {

    var that = this,
        placemark,
        adressText,
        coords = [55.76, 37.64],
        myMap,
        addPopover,
        addMap,
        destroyMap,
        listeners,
        init;

    //event listeners
    listeners = function() {
        $(that.selector).on('focus', addPopover);
        $(that.selector).on('shown.bs.popover', addMap);
        $(that.selector).on('hiden.bs.popover', destroyMap);
    };


    //initialization
    init = function(){
        listeners()
    };



    //add popover
    addPopover = function(){
        $(this).popover({
            placement: 'top',
            content: '<div id="map" style="width: 500px; height: 350px;"></div>',
            html: true,
            template: '<div class="popover" role="tooltip" style="max-width: none;"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
    };

    //add map
    addMap = function(){
            myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 12,
                controls: []
            });
        //создание маркера
        function addMarker(coords){
                placemark = new ymaps.Placemark([coords[0], coords[1]], {}, {
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '/images/placemark-sm.png',
                // Размеры метки.
                iconImageSize: [35, 50],
                iconImageOffset: [-17, -42]
            });
            myMap.geoObjects.add(placemark);

        }


        //создание поиска со значением
        var searchControl_ = new ymaps.control.SearchControl({ options: { size: 'large', noPlacemark: true } });

        //добавление адреса
        ymaps.ready(function(){

            //установка значения адреса
            adressText = options.element != undefined  ? $('body').find(options.element).val() : options.string;
            if(typeof adressText === 'string'){
                searchControl_.search(adressText)
            }

        });

        myMap.controls.add(searchControl_);

        //передача координат поиска в поле ввода
        searchControl_.events.add("resultshow", function (e) {
            coords = searchControl_.getResultsArray()[e.get('index')].geometry.getCoordinates();


            //создание маркерa
            myMap.geoObjects.removeAll();

            addMarker(coords);

            $(that.selector).val(coords[0] + ' ' + coords[1]);

        });

        //установка маркера по клику
        myMap.events.add('click', function (e) {

                var coords = e.get('coords');

                myMap.geoObjects.removeAll();

                addMarker(coords);

                $(that.selector).val(coords[0] + ' ' + coords[1]);
        });
    };

    //destroy map
    destroyMap = function () {
        myMap.destroy();
    };


    init();

};

