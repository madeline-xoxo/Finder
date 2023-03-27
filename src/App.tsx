import './OSX.css';
import Border from './components/Border';
import folderSmall from './img/folder-small.png'
import Sidebar from './components/Sidebar';
import SidebarItem from './components/SidebarItem';
import SidebarList from './components/SidebarList';
import { useEffect } from 'react';

function App() {
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
        items.forEach(item2 => {
          item2.classList.remove('list-selected');
        })
        item.classList.add('list-selected');
      })
    })
  }, [])
  return (
    <Border>
      <Sidebar>
        <SidebarList>
          <SidebarItem icon={folderSmall}>Desktop</SidebarItem>
          <SidebarItem icon={folderSmall}>madzzz</SidebarItem>
          <SidebarItem icon={folderSmall}>Applications</SidebarItem>
          <SidebarItem icon={folderSmall}>Pictures</SidebarItem>
          <SidebarItem icon={folderSmall}>Movies</SidebarItem>
          <SidebarItem icon={folderSmall}>Documents</SidebarItem>

        </SidebarList>
      </Sidebar>
    </Border>
  );
}

export default App;
