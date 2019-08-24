//Home Page form
export const cardData = {
    cardData: {
        title: {
            elementType: 'input',
            elementConfig: {
                label: 'Title',
                type: 'text',
                placeholder: 'Title'
            },
            rules: {
                maxLength: 20,
                required: true
            },
            value: '',
            valid: false,
            touched: false,
        },
        context: {
            elementType: 'textarea',
            elementConfig: {
                label: 'Context',
                type: 'text',
                placeholder: 'context'
            },
            rules: {
                maxLength: 100,
                required: true
            },
            value: '',
            valid: false,
            touched: false,
        },
        importantcy: {
            elementType: 'select',
            elementConfig: {
                label: 'Important',
                options: [
                    { value: 'high', displayValue: 'High' },
                    { value: 'medium', displayValue: 'Medium' },
                    { value: 'low', displayValue: 'Low' }
                ]

            },
            rules: {
                required: null
            },
            value: 'high',
            valid: true,
        },
    },
    cardValdiation: false
};



// Login,Register Form

export const authForm =  {
    authData: {
        userName: {
            elementType: 'input',
            elementConfig: {
                label: 'User Name',
                type: 'input',
                placeholder: 'User Name',
            },
            value: '',
            rules: {
                required: true
            },
            touched: false,
            valid: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                label: 'Password',
                type: 'password',
                placeholder: 'Enter Password',
            },
            rules: {
                required: true,
                minLength: 7,
            },
            value: '',
            touched: false,
            valid: false,
        }
    }
}







