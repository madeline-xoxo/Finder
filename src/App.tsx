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

function getCommandLine() {
  switch (process.platform) {
    case 'darwin':
      return 'open';
    default:
      return 'xdg-open';
  }
}

function openFileWithDefaultApp(file) {
  /^win/.test(process.platform) ?
    require("child_process").exec('start "" "' + file + '"') :
    require("child_process").spawn(getCommandLine(), [file],
      { detached: true, stdio: 'ignore' }).unref();
}

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
  const [currentPath, setCurrentPath] = useState<string>("");
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
    function setupSidebar() {
      const items = document.querySelectorAll('.sidebarItem');
      items.forEach(item => {
        item.addEventListener('mousedown', (e) => {
          const dir = (item as HTMLDivElement).dataset.location!;
          const sidebarselected = document.querySelectorAll('.list-selected');
          sidebarselected.forEach(selectedItem => {
            const itemdir = (selectedItem as HTMLDivElement).dataset.location!;
            const place = places.find(place => place.location === itemdir)!;
            place.selected = false;
          })
          places.find(place => place.location === dir)!.selected = true;
          setCurrentPath(dir);
          setLocation(fs.readdirSync(dir));
        })
        if (currentPath !== (item as HTMLDivElement).dataset.location) {
          (item as HTMLDivElement).classList.remove('list-selected')
        } else {
          (item as HTMLDivElement).classList.add('list-selected')
        }
      })
    }
    function setupFiles() {
      const items = document.querySelectorAll('.fileItem');
      items.forEach(item => {
        item.addEventListener('mousedown', (e) => {
          const sidebarselected = document.querySelectorAll('.fileItem');
          sidebarselected.forEach(selectedItem => {
            const selected = (selectedItem as HTMLDivElement);
            selected.classList.remove('files-selected')
          })
          const htmldiv = (e.target as HTMLDivElement);
          if (htmldiv.parentElement?.classList.contains('fileItem')) {
            htmldiv.parentElement?.classList.add('files-selected')
          } else {
            htmldiv.classList.add('files-selected')
          }
        })
      })
    }
    setupSidebar();
    setupFiles();
  }, [location])
  return (
    <Border>
      <div id="content">
        <div id="contentContainer">
          <Sidebar>
            <SidebarList>
              {places.map(place => (
                <SidebarItem selected={place.selected} key={Math.random()} dataLocation={place.location} icon={place.icon}>{place.name}</SidebarItem>
              ))}
            </SidebarList>
          </Sidebar>
        </div>
        <div id="footer" />
      </div>
      <div id="window-content">
        <div id="files">{location?.map(folder => {
          return <File onDoubleClick={(e) => {
            if (fs.lstatSync(`${currentPath}/${folder}`).isDirectory()) {
              setCurrentPath(`${currentPath}/${folder}`)
              setLocation(fs.readdirSync(`${currentPath}/${folder}`));
            } else {
              openFileWithDefaultApp(`${currentPath}/${folder}`)
            }
          }} key={`${Date.now()}${folder}`} icon={fs.lstatSync(`${currentPath}/${folder}`).isDirectory() ? folderSmall : ""} selected={false}>{folder}</File>
        })}</div>
      </div>
    </Border>

  );
}

export default App;
