var merge_list = {}

function veri() {
  var adet = document.querySelector("#file").files.length;
  document.querySelector("#sortlist").innerHTML = "";
  for (i = 0; i < adet; i++) {
    var br = document.createElement("br");
    var li = document.createElement("li");
    li.id = document.querySelector("#file").files[i].name;
    li.appendChild(document.createTextNode("Dosya İsimi : " + document.querySelector("#file").files[i].name));
    li.appendChild(br);
    li.appendChild(document.createTextNode("Dosya Boyutu : " + document.querySelector("#file").files[i].size + " kb"));
    document.querySelector("#sortlist").appendChild(li);
  }
  slist(document.querySelector("#sortlist"));
  getFiles();
  listFiles();
};

function getFiles() {
  const input = document.querySelector('#file');
  Array.from(input.files)
    .forEach(file => {
      merge_list[file.name] = file;
    });
};

function listFiles() {
  const input = document.querySelector('#sortlist');
  free_list = Array();
  Array.from(input.childNodes)
    .forEach(file => {
      free_list[file.id] = merge_list[file.id];
    });
    merge_list = free_list;
    console.log(merge_list);
};

function mergeFiles(){
  document.querySelector('#download_div').style.display = "block";
  document.querySelector('#merged_file').innerHTML = "";
  Object.keys(merge_list).forEach(function(key) {
    console.log(merge_list[key]);
    document.querySelector('#merged_file').innerHTML += key + '<br/>';
  });  
};

const uretici = async () => {
  let veri = new FormData();
  veri.append('process', 'merge_pdf');
  veri.append('files', merge_list);

  console.log('veri: ',veri);
  let denetciYaniti = await fetch('yaba/file-send', {
      method: 'POST',
      body: veri,
  });
  denetciYaniti = await denetciYaniti.json();
  console.log('denetci yaniti:', denetciYaniti);
};

function slist(target) {
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"), current = null;
  console.log(items);
  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;

    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = e => {
      current = i;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };

    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = e => {
      if (i != current) { i.classList.add("active"); }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => i.classList.remove("active");

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
      listFiles();
    };

    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = e => e.preventDefault();

    // (B7) ON DROP - DO SOMETHING
    i.ondrop = e => {
      e.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (i == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
};