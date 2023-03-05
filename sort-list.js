var merge_list = {};
var file_list = [];
var FILE = '';

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
  file_list = [];
  Array.from(input.childNodes)
    .forEach(file => {
      free_list[file.id] = merge_list[file.id];
      file_list.push(file.id);
    });
  merge_list = free_list;
};

function strip(string) {
  return string.replace(/^\s+|\s+$/g, '');
};

function downloadFile(url, fileName) {
  fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
    .then(res => res.blob())
    .then(res => {
      const aElement = document.createElement('a');
      aElement.setAttribute('download', fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    });
};

function ready_file(file_name) {
  FILE = strip(file_name);
  document.querySelector('#download_div').style.display = "block";
  document.querySelector('#merged_file').innerHTML = FILE + '.pdf';
};

function download_file() {
  file_path = 'http://localhost/tools/uploads/' + FILE + '.pdf';
  downloadFile(file_path,FILE);
}

const uretici = async () => {

  let veri = new FormData();
  veri.append('randomID', randomID(11));
  veri.append('process', 'merge_pdf');

  Object.keys(merge_list).forEach(function (key) {
    veri.append(merge_list[key].name, merge_list[key]);
  });

  veri.append('file_list', file_list);

  console.log('veri: ', veri);
  let denetciYaniti = await fetch('yaba/file-send', {
    method: 'POST',
    body: veri,
  });
  denetciYaniti = await denetciYaniti.json();
  console.log('denetci yaniti:', denetciYaniti);
  ready_file(denetciYaniti.gelen.dilCiktisi);
};

function randomID(leng) {
  var randomID = '';
  for (let c = 0; c < leng; c++) {
    randomID += getRndInteger(1, 9).toString();
  }
  return randomID;
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function slist(target) {
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"), current = null;
  // console.log(items);
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