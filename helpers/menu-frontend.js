const getMenuFrontEnd = ( role ) => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Main', url: '/' },
                { title: 'Progress Bar', url: '/dashboard/progress' },
                { title: 'Charts', url: '/dashboard/charts1' },
                { title: 'Promises', url: '/dashboard/promises' },
                { title: 'RXJS', url: '/dashboard/rxjs' },
            ]
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Usuarios', url: '/dashboard/usuarios' },
                { title: 'Hospitales', url: '/dashboard/hospitales' },
                { title: 'Médicos', url: '/dashboard/medicos' },
            ]
        }
    ]

    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ title: 'Usuarios', url: '/dashboard/usuarios' })
    }

    return menu

}

module.exports = {
    getMenuFrontEnd
}