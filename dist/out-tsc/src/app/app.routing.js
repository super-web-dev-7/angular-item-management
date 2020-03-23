"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Layouts
var layouts_1 = require("./@pages/layouts");
var auth_guard_1 = require("./auth/auth.guard");
exports.AppRoutes = [
    {
        path: '',
        redirectTo: "/projects",
        pathMatch: 'full'
    },
    {
        path: '',
        component: layouts_1.CorporateLayout,
        children: [{
                path: 'projects',
                loadChildren: './projects/projects.module#ProjectsModule',
                canActivate: [auth_guard_1.AuthGuard]
            }]
    },
    {
        path: '',
        component: layouts_1.BlankCorporateComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule'
            }
        ]
    }
];
//# sourceMappingURL=app.routing.js.map