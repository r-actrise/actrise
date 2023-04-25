$(function () {
  // ------------------------------
  // common
  // ------------------------------

  // header border {
  $(window).on("scroll", function () {
    if (600 < $(this).scrollTop()) {
      $(".header").addClass("is-show");
    } else {
      $(".header").removeClass("is-show");
    }
  });

  // to-top
  var top = $(".to-top");

  $(window).on("scroll", function () {
    if (1000 < $(this).scrollTop()) {
      $(".to-top").addClass("is-show");
    } else {
      $(".to-top").removeClass("is-show");
    }
  });

  $(top).on("click", function () {
    $("body, html").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // smooth scroll
  $('a[href^="#"]').on("click", function () {
    var id = $(this).attr("href");
    var position = 0;
    if (id != "#") {
      var position = $(id).offset().top;
    }
    var header = $(".header").innerHeight();

    $("html,body").animate(
      {
        scrollTop: position - header,
      },
      300
    );
  });

  // drawer menu
  $(".sp-gnav-icon").on("click", function (e) {
    e.preventDefault();

    $(".sp-gnav-icon").toggleClass("is-active");
    $(".sp-gnav").toggleClass("is-active");
    $(".sp-gnav-bg").toggleClass("is-active");

    return false;
  });

  // wow.js初期化
  new WOW().init();

  // ------------------------------
  // top
  // ------------------------------

  // swiper
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      1000: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    loop: true,
  });

  // modal
  $(".js-close-btn").on("click", function (e) {
    e.preventDefault();
    var target = $(this).data("target");
    $(target).hide();
    return false;
  });

  $(".js-open-btn").on("click", function (e) {
    e.preventDefault(e);
    var target = $(this).data("target");
    $(target).show();
    return false;
  });

  //formの入力確認
  let $submit = $("#js-submit");
  $("#js-form input, #js-form textarea").on("change", function () {
    if (
      $('#js-form input[type="text"]').val() !== "" &&
      $('#js-form input[type="email"]').val() !== "" &&
      $("#js-form textarea").val() !== "" &&
      $('#js-form input[name="entry.11556757"]').prop("checked") === true
    ) {
      // 全て入力された時
      $submit.prop("disabled", false);
      $submit.addClass("is-active");
    } else {
      // 全て入力されていない時
      $submit.prop("disabled", true);
      $submit.removeClass("is-active");
    }
  });

  // google form
  let $form = $("#js-form");
  $form.submit(function (e) {
    $.ajax({
      url: $form.attr("action"),
      data: $form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          // 送信に成功した時の処理
          $form.slideUp();
          $("#js-success").slideDown();
        },
        200: function () {
          // 送信に失敗した時の処理
          $form.slideUp();
          $("#js-error").slideDown();
        },
      },
    });

    return false;
  });
});
