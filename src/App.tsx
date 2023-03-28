import './OSX.css';
import Border from './components/Border';
import folderSmall from './img/folder-small.png'
import folderLarge from './img/folder-large.png';
import Sidebar from './components/Sidebar';
import SidebarItem from './components/SidebarItem';
import SidebarList from './components/SidebarList';
import { useEffect, useRef, useState } from 'react';
import * as os from 'os';
import * as fs from 'fs';
import File from './components/File';

const places = [
  {
    icon: folderSmall,
    name: 'Desktop',
    location: '/home/mads/Desktop',
    selected: true,
  }, {
    icon: folderSmall,
    name: os.userInfo().username,
    location: os.homedir(),
    selected: false,
  }, {
    icon: folderSmall,
    name: 'Pictures',
    location: '/home/mads/Pictures',
    selected: false,
  }, {
    icon: folderSmall,
    name: 'Videos',
    location: '/home/mads/Videos',
    selected: false,
  }, {
    icon: folderSmall,
    name: 'Documents',
    location: '/home/mads/Documents',
    selected: false,
  },
]

function App() {
  const [location, setLocation] = useState<string[]>();
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
        const dir = (item as HTMLDivElement).dataset.location!;
        const sidebarselected = document.querySelectorAll('.list-selected');
        sidebarselected.forEach(selectedItem => {
          const itemdir = (selectedItem as HTMLDivElement).dataset.location!;
          places.find(place => place.location === itemdir)!.selected = false;
        })
        places.find(place => place.location === dir)!.selected = true;
        setLocation(fs.readdirSync(dir));
      })
    })
  }, [location])
  return (
    <Border>
      <Sidebar>
        <SidebarList>
          {places.map(place => (
            <SidebarItem selected={place.selected} key={Math.random()} dataLocation={place.location} icon={place.icon}>{place.name}</SidebarItem>
          ))}
        </SidebarList>
      </Sidebar>
      <div id="files">{location?.map(folder => {
        return <SidebarItem icon={folderSmall} dataLocation="" selected={false}>a</SidebarItem>
      })}</div>
      <div id="footer" />
    </Border>

  );
}

export default App;
