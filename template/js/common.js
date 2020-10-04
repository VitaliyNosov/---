jQuery(document).ready(function ($) {
  var scroll_width = window.innerWidth - document.documentElement.clientWidth;

  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });

  $(".form").submit(function () {
    var form = $(this),
      error = 0;

    form.find(".error").removeClass("error");

    //проверяем поля формы на пустоту
    form.find(".required").each(function () {
      if (
        $(this).val() == "" ||
        ($(this).attr("type") == "tel" && $(this).val().indexOf("_") > -1)
      ) {
        $(this).addClass("error");
        error = 1;
      }
    });

    form.find(".required-email").each(function () {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
      if ($(this).val() == "" || !pattern.test($(this).val())) {
        $(this).addClass("error");
        error = 1;
      }
    });

    var policy = form.find("[name='policy']");
    if (policy.length > 0 && !policy.is(":checked")) {
      policy.closest(".form-checkbox").addClass("error");
      error = 1;
    }
    if (error == 0) {
      $(document).on("af_complete", function (event, response) {
        var form = response.form;
        if (form.attr("id") == "FormOrder") {
          form.hide();
          $("#FormOrder").fadeIn(700);
          $("#call-popup .title h3").html("Спасибо!");
          $("#call-popup .title p").html(
            "Ваша заявка принята, ждите обратного звонка!"
          );
          $("#call-popup .ty-popup__img").html(
            '<img src="template/img/thanks.png" style="margin: 0 0 20px;" alt="">'
          );
          $("#call-popup").addClass("hidden");
          $(".FormOrder").addClass("hidden");
        } else {
        }
        if (form.attr("id") == "FormOrderCall") {
          form.hide();
          $("#FormOrderCall").fadeIn(700);
          $(".s-call .title h2").html("Спасибо");
          $(".s-call .title p").html(
            "Ваша заявка принята, ждите обратного звонка!"
          );
          $(".FormOrderCall").addClass("hidden");
        } else {
        }

        response.message = "";
      });
    }

    // 		// если ошибок нет то отправляем данные
    // 		if(error == 0){
    // 			$.ajax({
    // 				type: 'POST',
    // 				url: 'mail.php',
    // 				data: form.serialize()
    // 			}).done(function() {
    // 				alert('Отправлено!');
    // 				// popup_open('#ty-popup', true);
    // 				form.trigger('reset');
    // 			});
    // 		}

    // 		return false;
  });

  // Fancybox
  // For fixed blocks .compensate-for-scrollbar

  var fancybox_args = {
    infobar: true,
    autoFocus: false,
    backFocus: false,
    animationEffect: "fade",
    buttons: [
      "zoom",
      //"share",
      "slideShow",
      "fullScreen",
      //"download",
      "thumbs",
      "close",
    ],
    i18n: {
      en: {
        CLOSE: "Закрыть",
        NEXT: "",
        PREV: "",
        ERROR: "Ошибка. <br/>Попробуйте позже.",
        PLAY_START: "Старт слайд-шоу",
        PLAY_STOP: "Пауза слайд-шоу",
        FULL_SCREEN: "Полноэкранный режим",
        THUMBS: "Превью",
        DOWNLOAD: "Скачать",
        SHARE: "Поделиться",
        ZOOM: "Масштабирование",
      },
    },
  };

  $("[data-fancybox]").fancybox(fancybox_args);

  function popup_open(src) {
    $.fancybox.open({
      src: src,
      opts: fancybox_args,
    });
  }

  // Fancybox END

  $('[type="tel"]').mask("+7 (999) 999-99-99");

  // Sliders

  var slick_prev =
    '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="7.86" viewBox="0 0 16 7.86"><path d="M4.79,5.36H15.57A.43.43,0,0,0,16,4.93v-2a.43.43,0,0,0-.43-.43H4.79V.86A.86.86,0,0,0,3.32.25L.25,3.33a.86.86,0,0,0,0,1.21L3.32,7.61A.86.86,0,0,0,4.79,7Z"/></svg> Назад</button>';
  var slick_next =
    '<button type="button" class="slick-next">Далее <svg xmlns="http://www.w3.org/2000/svg" width="16" height="7.86" viewBox="0 0 16 7.86"><path d="M11.21,2.5H.43A.43.43,0,0,0,0,2.93v2a.43.43,0,0,0,.43.43H11.21V7a.86.86,0,0,0,1.47.6l3.07-3.07a.86.86,0,0,0,0-1.21L12.68.25a.86.86,0,0,0-1.47.61Z"/></svg></button>';

  $(".reviews__slider")
    .slick({
      arrows: false,
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(".reviews-nav__info p").hide().eq(nextSlide).fadeIn(400);
    });
  $(".reviews-nav__prev").click(function () {
    $(".reviews__slider").slick("slickPrev");
  });
  $(".reviews-nav__next").click(function () {
    $(".reviews__slider").slick("slickNext");
  });

  $(".scheme__slider")
    .slick({
      prevArrow: slick_prev,
      nextArrow: slick_next,
      infinite: false,
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(".scheme__nav-info li")
        .removeClass("active")
        .eq(nextSlide)
        .addClass("active");
    });
  $(".scheme__nav-info li").eq(0).addClass("active");

  // Sliders END

  $(".menu a").mPageScroll2id({
    scrollSpeed: 750,
    // offset: $('.header').outerHeight()-1,
    onStart: function () {
      // code
    },
  });
});
