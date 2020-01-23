window.onload = function() {
    var priceEdit = document.getElementById("price-total-edit");
    var price = document.getElementById("price-total");
    var iconHeart = document.getElementById("icon-heart");
    var priceM2 = document.getElementById("sup-total");
    var m2 = 380;

    var modal = document.querySelector(".modal");
    var buttonOpenModal = document.getElementById("open-modal");
    var buttonCloseModal = document.getElementById("close-modal");
    var formModal = document.getElementById("formContact");


    /*****************slider****************/
    var prevSlide = document.getElementById("prev-slide");
    var nextSlide = document.getElementById("next-slide");
    prevSlide.value = -1
    nextSlide.value = 1
    prevSlide.addEventListener("click", plusSlides)
    nextSlide.addEventListener("click", plusSlides)
    var slideIndex = 1;

    function plusSlides() {
        showSlides(slideIndex += this.value);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }

    showSlides(slideIndex);
    /***************************************/

    /*************Favorite*****************/
    function addColorFavorite() {
        iconHeart.style.backgroundImage = "url('images/icons/heart-red.svg')";
    }

    function removeColorFavorite() {
        iconHeart.style.backgroundImage = "url('images/icons/heart-black.svg')";
    }

    function loadFavorite() {
        var isFavorite = localStorage.getItem("isFavorite");
        if(isFavorite === '1')
            addColorFavorite()
        else if(isFavorite === '0')
            removeColorFavorite()
    }

    function changeFavorite() {
        var isFavorite = localStorage.getItem("isFavorite");
        if(!isFavorite || isFavorite === '0'){
            localStorage.setItem("isFavorite", 1);
            addColorFavorite();
        }else{
            localStorage.setItem("isFavorite", 0);
            removeColorFavorite();
        }
    }
    /************************************/

    /*************Price*****************/
    function savePrice(value) {
        localStorage.setItem("price",value);
    }

    function getPriceWithPoint(value){
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function setPriceByM2(value){
        priceM2.innerHTML = Math.round(value/m2);
    }

    function setNewPrice() {
        if (priceEdit.value != ''){
            var value = priceEdit.value.toString().split(".")[0];
            savePrice(value);
            setPriceByM2(value);
            price.innerHTML = getPriceWithPoint(value)
        }
        priceEdit.style.display = 'none';
        price.style.display = 'inline';
    }

    function loadPrice() {
        var value = localStorage.getItem("price");
        if (value){
            price.innerHTML = getPriceWithPoint(value);
            setPriceByM2(value);
        }
    }

    function changePrice(){
        var price = this.innerHTML.replace (/\./g, '');
        priceEdit.value = parseInt(price);
        this.style.display = 'none';
        priceEdit.style.display = 'inline';
        priceEdit.focus();
    }

    function eventKeyDown(e){
        if (e.which == 13 || e.key === "Escape") {
            setNewPrice();
        }
    }
    /**************************************/

    function loadValues() {
        loadFavorite();
        loadPrice();
    }

    loadValues();


    /***************modal******************/
    function sendEmailContact() {
        if (isValidForm()){
            document.getElementsByClassName("modalDialog")[0].style.display = "none";
        }
    }

    function isValidForm() {
        var email = document.getElementById("email").value;
        var emailReg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email ==='' || !emailReg.test(email)){
            document.getElementById('error-email').style.display = 'block';
            return false;
        }else{
            document.getElementById('error-email').style.display = 'none';
            return true;
        }
    }

    function showHideModal(){
        modal.classList.toggle("show-modal");
    }

    function openModal(event) {
        showHideModal();
    }
    
    function closeModal(){
        showHideModal();
        document.getElementById('modal').style.display = 'none';
    }

    price.addEventListener("click", changePrice)
    priceEdit.addEventListener("keydown", eventKeyDown)
    iconHeart.addEventListener("click", changeFavorite)
    priceEdit.addEventListener("blur", setNewPrice)
    buttonCloseModal.addEventListener("click", closeModal)
    buttonOpenModal.addEventListener("click", openModal)
    formModal.addEventListener("submit", sendEmailContact)

}

