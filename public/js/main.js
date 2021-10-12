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
    const contactTemplate = 'template_16z0p8m';
    const inscripcionTemplate = 'template_u0lj23h';

    if ( contactForm ) {
        contactForm.addEventListener( 'submit', ( e ) => {
            e.preventDefault();     
            let errorMessages = validateForm( name, pronouns, email, message, null, null );
    
            if( errorMessages.length > 0 ) {
                errorMessage.innerText = errorMessages.join( '\n' );
                errorMessage.classList.remove( 'hidden' );
            } else {
                errorMessage.classList.add( 'hidden' );           
                sendMail( name, pronouns, email, message, null, null, submit, contactTemplate );
            }
        } );
    }
    

    const inscripcionForm = document.querySelector( '#inscripcion-form' );
    const paymentMethod = document.querySelector( 'input[name="payment-method"]' );
    const taller = document.querySelector( 'input[name="taller"]' );

    if ( inscripcionForm ) {
        inscripcionForm.addEventListener( 'submit', ( e ) => {
            e.preventDefault();     
            let errorMessages = validateForm( name, pronouns, email, message, taller, paymentMethod );
    
            if( errorMessages.length > 0 ) {
                errorMessage.innerText = errorMessages.join( '\n' );
                errorMessage.classList.remove( 'hidden' );
            } else {
                errorMessage.classList.add( 'hidden' );           
                sendMail( name, pronouns, email, message, taller, paymentMethod, submit, inscripcionTemplate);
            }
        } );
    }


});

/* Menu */
const navResponsive = () => {
    const burgerMenuBtn = document.querySelector( '#burger-menu-toggler' );
    const menuItems = document.querySelectorAll( '.menu-item' );

    if( burgerMenuBtn ) {
        burgerMenuBtn.addEventListener( 'click', () => {
            document.body.classList.toggle( 'mobile-menu-active' );
        });
    }

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

        if ( !document.body.classList.contains( 'clases' ) ) {
            sections.forEach( ( section, i ) => {
                let sectionPosTop = section.getBoundingClientRect().top + scrollY - 90;
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
        }

    } );

}


/* Forms */

/*  From validation */
const validateForm = ( name, pronouns, email, message, taller, paymentMethod ) => {
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

    if( taller ) {
        if( taller.value === null ) {
            errorMessages.push( 'Por favor elegí un taller.' );
        }
    }

    if( paymentMethod ) {
        if( paymentMethod.value === null ) {
            errorMessages.push( 'Por favor elegí un método de pago.' );
        }
    }


    return errorMessages;
}

/* EmailJS */
const sendMail = ( name, pronouns, email, message, taller, paymentMethod, submit, template ) => {
    let tempParams = {
        name: name.value,
        pronouns: pronouns.value,
        email: email.value,
        message: message.value,
        taller: taller.value ? taller.value : null,
        paymentMethod: paymentMethod.value ? paymentMethod.value : null
    }

    emailjs.send(
        'service_5p8sqsw',
        template,
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



