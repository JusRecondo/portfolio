document.addEventListener( "DOMContentLoaded", () => {

    /* Menu */
    navResponsive();

    /* Email JS */
    const contactForm = document.querySelector( '#contact-form' );
    const name = document.querySelector( '#name' );
    const pronouns = document.querySelector( '#pronouns' );
    const email = document.querySelector( '#email' );
    const message = document.querySelector( '#message' );
    const errorMessage = document.querySelector( '.error-message' );
    const submit = document.querySelector( '#submit' );

    contactForm.addEventListener( 'submit', ( e ) => {
        e.preventDefault();     
        let errorMessages = validateForm( name, pronouns, email, message );

        if( errorMessages.length > 0 ) {
            errorMessage.innerText = errorMessages.join( '\n' );
            errorMessage.classList.remove( 'hidden' );
        } else {
            errorMessage.classList.add( 'hidden' );           
            sendMail( name, pronouns, email, message, submit );
        }
    } );


});

/* Menu */
const navResponsive = () => {
    const burgerMenuBtn = document.querySelector( '#burger-menu-toggler' );
    const menuItems = document.querySelectorAll( '.menu-item' );

    burgerMenuBtn.addEventListener( 'click', () => {
        document.body.classList.toggle( 'mobile-menu-active' );
    });

    menuItems.forEach( ( menuItem ) => {  

        menuItem.addEventListener('click', function() {

            document.body.classList.remove( 'mobile-menu-active' );


            let currentItem = document.querySelector( '.active' );
            currentItem.classList.remove( 'active' );

            this.classList.add( 'active' );
        })
    });

    const navBar = document.querySelector( '#main-menu');
    window.addEventListener( 'scroll', () => {
        let scrollY = this.scrollY;

        if ( scrollY > 80 ) {
            navBar.classList.add( 'shrink' );
        } else {
            navBar.classList.remove( 'shrink' );
        }
     
        const sections = document.querySelectorAll( 'section' );
        const header   = document.querySelector( 'header' );

        sections.forEach( ( section, i ) => {
            let sectionPosTop = section.getBoundingClientRect().top + scrollY - 120;
            let sectionPosBottom = sectionPosTop + section.offsetHeight;
            let headerPosTop = header.getBoundingClientRect().top + scrollY;
            let headerPosBottom = headerPosTop + header.offsetHeight;
            let currentItem = document.querySelector( '.active' );

            if ( scrollY >= sectionPosTop && scrollY <= sectionPosBottom ) {
                currentItem.classList.remove( 'active' );
                menuItems[ i + 1 ].classList.add( 'active' );
            } else if ( scrollY >= headerPosTop && scrollY <= headerPosBottom ) {
                currentItem.classList.remove( 'active' );
                menuItems[ 0 ].classList.add( 'active' );
            }

        } );

    } );

}


/* Contact form */

/*  From validation */
const validateForm = ( name, pronouns, email, message) => {
    let errorMessages =[];
    if( name.value === '' || name.value === null ) {
        errorMessages.push( 'Por favor ingresá tu nombre.' );
    }
    if( pronouns.value === '' || pronouns.value === null ) {
        errorMessages.push( 'Por favor ingresá el/los pronombres que usas.' );
    }
    if( email.value === '' || email.value === null || !email.value.includes( '@' ) ) {
        errorMessages.push( 'Por favor ingresá un email válido.' );
    }
    if( message.value === '' || message.value === null ) {
        errorMessages.push( 'Por favor escribí un mensaje.' );
    }

    return errorMessages;
}

/* EmailJS */
const sendMail = ( name, pronouns, email, message, submit ) => {
    let tempParams = {
        name: name.value,
        pronouns: pronouns.value,
        email: email.value,
        message: message.value,
    }

    emailjs.send(
        'service_9kg3woi',
        'template_16z0p8m',
        tempParams
    )
    .then( () => {
        const notification = document.querySelector( '.notification' );
        notification.classList.remove( 'hidden' );
        const reset = document.querySelector( '#reset' );
        reset.classList.remove( 'hidden' );

        reset.addEventListener( 'click', function() {
            this.classList.add( 'hidden' );
            notification.classList.add( 'hidden' );
        });

        name.classList.add( 'shine' );
        pronouns.classList.add( 'shine' );
        email.classList.add( 'shine' );
        message.classList.add( 'shine' );
        submit.classList.add( 'shine' );

        setTimeout( () => {
            name.classList.remove( 'shine' );
            pronouns.classList.remove( 'shine' );
            email.classList.remove( 'shine' );
            message.classList.remove( 'shine' );
            submit.classList.remove( 'shine' );
        }, 6000);
    })
}



