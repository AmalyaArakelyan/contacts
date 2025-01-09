import ContactInfo from '../components/ContactInfo.tsx'
import SideBar from './SideBar.tsx'
export default function contacts() {
    return (
        <div className=" flex w-full h-screen bg-gray-100">
            <SideBar />
            <ContactInfo />
        </div>

    );
}


