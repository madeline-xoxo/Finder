import './OSX.css';
import Border from './components/Border';
import folderSmall from './img/folder-small.png'
import Sidebar from './components/Sidebar';
import SidebarItem from './components/SidebarItem';
import SidebarList from './components/SidebarList';
import { useEffect, useRef, useState } from 'react';
import * as os from 'os';
import * as fs from 'fs';
import untildify from 'untildify';

const places = [
  {
    icon: folderSmall,
    name: 'Desktop',
    location: '/home/mads/Desktop',
  }, {
    icon: folderSmall,
    name: os.userInfo().username,
    location: os.homedir(),
  }, {
    icon: folderSmall,
    name: 'Pictures',
    location: '/home/mads/Pictures',
  }, {
    icon: folderSmall,
    name: 'Videos',
    location: '/home/mads/Videos',
  }, {
    icon: folderSmall,
    name: 'Documents',
    location: '/home/mads/Documents',
  },
]

function App() {
  const [location, setLocation] = useState(os.homedir());
  useEffect(() => {
    var headers = document.querySelectorAll('.collapsible-header');
    headers.forEach((header) => {
      (header as HTMLDivElement).parentElement!.style.setProperty("--marker", "\"▼ \"")
      header.addEventListener('click', function (this: HTMLDivElement) {
        var body = this.nextElementSibling;
        (body! as HTMLElement).style.display = (body! as HTMLElement).style.display === 'none' ? 'block' : 'none';
        (header as HTMLDivElement).parentElement?.style.setProperty("--marker", (header as HTMLDivElement).parentElement?.style.getPropertyValue("--marker") == `"▼ "` ? `"▶ "` : `"▼ "`);
      });
    });
    const items = document.querySelectorAll('.sidebarItem');
    items.forEach(item => {
      item.addEventListener('mousedown', (e) => {
        const sidebarselected = document.querySelectorAll('.list-selected');
        sidebarselected.forEach(selectedItem => {
          console.log(selectedItem)
          selectedItem.classList.remove('list-selected');
        })
        item.classList.add('list-selected');
        const dir = (item as HTMLDivElement).dataset.location!;
        setLocation(dir);
      })
    })
  }, [location])
  return (
    <Border>
      <Sidebar>
        <SidebarList>
          {places.map(place => (
            <SidebarItem key={Math.random()} dataLocation={place.location} icon={place.icon}>{place.name}</SidebarItem>
          ))}
        </SidebarList>
      </Sidebar>
      <div id="list" style={{ padding: 15 }}>{location}</div>
    </Border>
  );
}

export default App;
