import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '~/components/sidebar/SideBar';
import { AdminContextProvider } from '~/core/provider/admin/AdminProvider';
import { TraceNavBarComponent } from '~/pages/trace/components/navbar/TraceNavBarComponent';
import { TraceSideBarNavigationComponent } from '~/pages/trace/components/sidebar/TraceSideBarNavigationComponent';

export const TracePageLayout: React.FC = () => {
    return (
        <AdminContextProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <SideBar>
                    <TraceSideBarNavigationComponent />
                </SideBar>
                <div className="w-full p-1 md:w-4/5">
                    <TraceNavBarComponent />
                    <Outlet />
                </div>
            </div>
        </AdminContextProvider>
    );
};
