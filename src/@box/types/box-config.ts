export interface BoxConfig
{
    layout: {
        style: string,
        width: 'fullwidth' | 'boxed',
        notification: {
            hidden: boolean,
            position: 'left' | 'right' | 'top',
            background: string,
        },
        header: {
            hidden: boolean,
            position: 'top' | 'top-fixed',
            background: string,
            custom: string,
        },
        navbar: {
            hidden: boolean,
            folded: boolean,
            position: 'left' | 'right' | 'top',
            background: string
        },
        toolbar: {
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed',
            background: string
        },
        brand: {
            background: string,
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed'
        },
        shop: {
            background: string,
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed'
        },
        footer: {
            background: string,
            style: string,
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed'
        },
        newsletter: {
            background: string,
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed'
        },
        sidepanel: {
            hidden: boolean,
            position: 'left' | 'right'
        }
    };
    customScrollbars: boolean;
}
