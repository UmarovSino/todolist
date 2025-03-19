let box = document.querySelector(".box")
let section = document.querySelector(".section")
let tarafirost = document.querySelector(".tarafirost")
let list = document.querySelector(".list")
let search = document.querySelector(".search")
let selectstatus = document.querySelector(".selectstatus")
let add = document.querySelector(".add")
let tarafichap = document.querySelector(".tarafichap")
let trchap = document.querySelector('.trchap')
let addDialog = document.querySelector('.addDialog')
let addForm = document.querySelector(".addForm")
let addSelect = document.querySelector(".addSelect")
let xclose = document.querySelector(".xclose")
let close = document.querySelector(".close")
let editDialog = document.querySelector('.editDialog')
let editForm = document.querySelector(".editForm")
let editSelect = document.querySelector(".editSelect")
let editxclose = document.querySelector(".editxclose")
let getbyId = document.querySelector(".getbyIds")
let idd = document.querySelector(".idd")
let idds = document.querySelector(".idds")
let coseget=document.querySelector(".coseget")
let idx = null;

list.style.display = "flex";
list.style.flexDirection = "column";
list.style.gap = "10px";
search.style.width = "200px";
selectstatus.style.width = "80px";

///API
let API = "http://localhost:3000/data";

////functionsearch
search.oninput = async () => {
    try {
        let response = await fetch(`${API}?text=${search.value}`)
        let data = await response.json()
        getData(data)
    } catch (error) {
        console.error(error)
    }
}
/////functinselectStatus
selectstatus.onchange = async () => {
    if (selectstatus.value != "all") {
        try {
            let response = await fetch(`${API}?status=${selectstatus.value == "true" ? true : false}`)
            let data = await response.json()
            getData(data)
        } catch (error) {
            console.error(error);

        }
    }
    else {
        get()
    }
}
////Onclicks
add.onclick = () => {
    addDialog.showModal()
}
xclose.onclick = () => {
    addDialog.close()
}
editxclose.onclick = () => {
    editDialog.close()
}
close.onclick = () => {
    addDialog.close()
}
////functionadd
addForm.onsubmit = async (event) => {
    event.preventDefault()
    let form = event.target;
    let addUser = {
        text: form["addtext"].value,
        text1: form["addtext1"].value,
        status: form["addSelect"].value == "true" ? true : false
    }
    try {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addUser)
        })
        get()
    } catch (error) {
        console.error(error);

    }
}
////асинхроний функция дата
async function get() {
    try {
        let response = await fetch(API)
        let data = await response.json()
        getData(data)
    } catch (error) {
        console.error(error)
    }
}
get()
////function del
async function functionDEL(id) {
    try {
        await fetch(`${API}/${id}`,
            {
                method: "DELETE"
            }
        )
    } catch (error) {
        console.error(error)
    }
}

/////function edit
function edditshowModal(element) {
    editDialog.showModal()
    editForm["edittext"].value = element.value,
        editForm["edittext1"].value = element.value,
        idx = element.id
}
editForm.onsubmit = async (event) => {
    event.preventDefault()
    let form = event.target;
    let editText = {
        text: form["edittext"].value,
        text1: form["edittext1"].value,
    }
    try {
        await fetch(`${API}/${idx}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
                ,
                body: JSON.stringify(editText)
            }
        )
        get()
    } catch (error) {
        console.log(error);

    }
}
////functioncheck
async function editStatus(user) {

    let newStatus = {
        ...user,
        status: !user.status
    }

    try {
        try {
            await fetch(`${API}/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                    ,
                    body: JSON.stringify(newStatus)
                }
            )
            get()
        }
        catch (error) {
            console.log(error);

        }
    } catch (error) {
        console.log(error)
    }
}

////finctiongetbyid
async function functiongetByid(id) {
    try {
        let response = await fetch(`${API}/${id}`)
        let data = await response.json()
        fgetByid(data)
    } catch (error) {
        console.error(error);

    }



}
function fgetByid(data) {
    getbyId.showModal();
    idd.innerHTML = data.text;
    idds.innerHTML = data.text1;
}
coseget.onclick=()=>{
    getbyId.close()
}
/////синхронний функсия дата
function getData(data) {
    trchap.innerHTML = ""
    data.forEach((e) => {
        let container = document.createElement("div")
        let text = document.createElement('p')
        let text1 = document.createElement("p")
        text.innerHTML = e.text;
        text1.innerHTML = e.text1
        let btndelete = document.createElement("button")
        let img = document.createElement("img");
        img.style.width = "20px"
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////8AAX8AAD+ubr9dHX9T1D9goP+n5/9X2D9Y2X/+vr8KCn+lpf/6Oj+ra78Kiz9iov/8/P+zc3+pqf9bG3+2Nn/4+P+mpv/7e3+kZL/3d7+v8D/9PT+xsf9hof8NTf9V1j9aGn9PD78HiH9QkT8Exb9fH38MzT8DhH+xMX9Skz9U1X+q6z+09P9cXP+vLyf6F+BAAAGrUlEQVR4nO2da1vaWhBG40gvgghSsKBWUKqlnmr//78rMSJJq2YG3ncyec5en8FkgcCePZedZVBG49uD/bgdj7C3hOVRRPY0XP+Fx6Y13ma8r96z5LhpkbcYYQTXilH/UY9ghtdNq7zBD5jhvGmV1+n2YIa9btMyr5IMk2EybJ5kmAyTYfMkw2SYDJvnf2C4FBTLoIaPRygeYxomEolEIpFIJBI8upOTq05Urk4m+67Rp8MBLCTiMBhO9xEc5n8DFNZyyG9wuLPf2Ty4XoHI/Gw3wcmqDX45sprsIjhtxRtYILLLh3HeHsHd8uJf2yS4VvxqFTxtzYewQFanRsNP7RJcK34yGn5vneF3m2CbvkgLrF+nP9smuFb8ZjJs3cdwbfjFZNiy34oc4+/FcQsNj5NhMoxOMkyG8UmGyTA+yTAZxsdoOGt2q34nZibDyWH72GlXOJFIJBKJRCKRiETTYcPr/AAazpuWeZUF0PBDxIAYOiHkOqThR6Dhx5CGu9ez/ctVSENzCc07hNyYkhOg4ZeQhj+BhochDZFbT99CGvaBhucBDQVq2I9oeLBXgfc/hvEUpWetRnyP6UFAwxtks/AprBEdh3wACmbdm4CGn5GGEYML8FC3zwEN76CGAcMnY76wjo7VsIjCGQ9+eZKtnrQOY/gksrw7nl0r71pkPDvuWJsD5DfU0FZRK8+F81PVuE+5e/rp7s5sbyN4QOaJ5eKyvfiw/nnbNoILk6I8QA1NwUW59aH2Z0aOtg9WvB7b50GDJ9vwVRHLE+V8++BTw5sosmNL3hs8WAxL70p2uXz/mTIvry7vDYbmNqD3Obe8upXSnZqbrm7r3hmusoQKmsKnagdSzQexuro07FrKAGt4eRvO8AZrmNV8nBow/A9sOAhniB76bQgQnQyvwIaGANHJ0NpRWYchfHIyRO7pW6/tY3gINjTkZpwMbQ2V9RiCCydDbGhhys04GSL39HMuwhmih0cawicnQ7CgJfvkYihww2k0Q3DwtCaaoXGEQgsNsVmLJ0P9xV0MkeVCBfoA0cfQ1uWkQT/sxMcQHVpYsk8+hr/ghvptMB9DbNYiZxbMEH+slz4342OI3fHO0Ze2+Rhid7xz9OGTh6HIJdxQn31yMVzhJ+9PYhkO8Ib64MLF8B4umF3GMsQvvNeG6qt7GHbwhl119snFEFsuVBiqT6h0MUR2ImxQZ6BdDPGhheEcVRdDdNYiR1345WLIOE9XHT65GJ5neNTlPK01VIdPDobocqECdfbJw/AW2YmwQT201cNwgA+eDMGFhyG6mOYJdW7Gw5AQWmTZmXbp7WG4YBiqS9s8DCnHy0+1+/oehoTQwhBceBjisxY52syFhyFj4a0v/PIwvKAYLgIZosuFClTNE06G6HKhAm34xDcUSmihL23zMGQsvLPsVyBDzmm62sIvB8MDiqA6N+NgiC8XekJb2uZgSAme8gBReX2+4YJjqA2fHAyR85NKaDvLHAyxLcBb4hhiW4C3KLNPDoac0ELdGeRgiO5E2KAMEB0MOaGFurTNwZCz8FZnnxwMOQtvdWmbgyFJUFv4RTfE1+lvUOZm+IYrlqGytI1viBxcWkEZPvEN0S3ALyizT3xD0sJbPbWNb4huAX6hG8WQFVpo+2b4hsjBpX8Z6m6AbsgKLbR9M3xDTtYiRxdc8A05e/o5uuCCb4huAd6iCy7Yhqw9/Rxd4VebDXXhE91wySgXKtCd9Ew3hA4uraILn+iG0MGlVXTZJ7rhUUZDN9OMboieLlRCF1zQDSnlQgW6ziC6IS+0WBuq7oBtyOhEeOZUlbmotMp35zWGlS9G1bKQtqef364qc1HZKKqraKwuUHSvIKMTYYMquJDy2r92GVTOlOkKrYmhhbbwq5Rmr58oWToAQPkvQsta5Chnmsn9cx/yg+KrSVbPdzyt+ci+GDI6ETY8assx5Pi83x91dN+9cvfQ70+0Y4Q5nQgbDL3WhgnWpgcfSI+38LYMVsjvW/9Yy4NlThQMcaIOYbpQid8RDBdMQ8vAZJohMbQIYoifn1TCMhKaZkhceBs6g5iGxIX3etlhPcCAYYifLlSiaxgJTTNklQsVqMcOEA2ZoYVpJDTNkLnwNo32pxnydrxzmj8ziFcuVGA+Uad1hpZTREiGpE6EDc0HF6xOhA3NH9fJmJ9UxjASmmVIXXjnC9PGDVl1+hsaX7YRyxQKmv6q4dUlvmA4rIQhSF6V5mj7u0iCvJK2LaPmFIWZOizRX9gPK4ToSY8a/JaZzG5W7oa9zm4Fe38AKC+jhABGgOsAAAAASUVORK5CYII=";
        btndelete.appendChild(img);
        btndelete.style.border = "none"
        btndelete.style.background = "white"
        btndelete.onclick = () => {
            functionDEL(e.id)
        }
        let delcheck = document.createElement("div")
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = e.status;
        checkbox.onclick = () => {
            editStatus(e)
        }
        let editimg = document.createElement("img")
        editimg.type = "image"
        editimg.style.width = "20px"
        editimg.style.background = "white"
        editimg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8hISEAAADJycn4+PjOzs6Pj48uLi4XFxfDw8Pf398EBAStra0QEBBtbW0aGhq6urpPT08SEhLy8vJmZmaysrInJydCQkJ7e3uBgYHq6up0dHSHh4enp6cZGRnX19eYmJhcXFw1NTU+Pj5HR0e0iDzQAAAE1UlEQVR4nO3d23baMBAFUDHhDsbEXBsCaRL+/xtrU5oFCbYla0YzUue89kV72ccyklIbE1/6g/lw8fyx7fVG5/Wv4+SFe0C4GQw/AGbZKe9VyfMiAygOyz73uJAyfc0g+2u7SwGwnnAPDiFPz5D91F0zht6Re4CeGezgVOu7BLI59yA9slrDg7vzh3E04B5o12ygaPeVyWHPPdRuWYOVr0q2nXKP1j0v2/oHzKPLuOQesGvebBp4G/jNPWS3DOzv0C/iK/egXfLkDoyL2AkY043aEVgSI3ncdAaWxCgmDQ9gL99yj94iPsBy6pf/duMHLO9T6e+ovsBePuImNMcbWF5E0T8YEYBlFbkVDUEBSr6IExRgGW5IXZZYQJC6PPWKJRyvuSl1GaJdRLHrqFhEwS/gSMTiwA2pDxaR29EQHCJI3rZBIYqdLy7BIGZyX2uqIBCLX9yI5vgTc7Fz/jX+xDM3oS3eROE/gw0CkRtwzWRV+0++xICKhkxgVP+K7EkMyKhP+YN3TEX8COiozeUXPRExfw4Iqct1yYKGeFoElNTka02GhFgMA1Ie52bRiYI4Yz+AcreqRkBkX9r/tmyIT+ReqPmxLopNzJkniwcLv8jEjPdB83BlG5fIW8OapXtUIuveTO3mCyIx4zx10rC7hEfkPK7QuH2GRTwxvpS27A8iEeEpIOk+rRugKMR8F5B0H4sdXgwi31RhtYXtTyzYFhIt9+i9iVC/9kMb60MInkTYBETdxuGUhRcx47pHnY6ReBDZDu45npPpTuTaN3Q+CNSVCG8BVTfpcNKpG5HrZabTUa4uxKiAXYiRAd2J0QFdiREC3YhRAl2IkQLtidECbYlcvwhRjjTbEKMG2hAjB7YTowe2ERMANhNf432K2hJ5ggyUR0QHSiMSAGURSYCSiERAOUQyoBQiIVAGkRQogUgM5CeSA7mJAYC8xCDAiih+f9A3Ea/JWAJT+D2oQAUqUIEKVKACFahABSpQgQpUoAIVqEAFKlCBClSgAhWoQAUqUIEKVKACFahABSpQgQpUoAIVqMD/GJj8iV8FKlCBClSgAuUBO3wqOi7gNHXgS+pAM3L8XHt0wHWWOPAY6B5lA4YqId9/1LwLU0I+YKB7lA/YTx1o9kGeo4zAMI8ZRqA5FIkDg1xCTqAZBmghK9AEuIS8QLRvmksFmvdT4kD62Z4ZSH+TcgPJJ0N2oCGeKviBxMtP/EAznyUONItx4kBDeQlFAClrKAJIWUMZQMIaCgHSzYZSgGQ1lAIkq6EYIFUN5QCJaigISFNDQUCaGkoCktRQFJCihrKABDWUBSSooTAgfg2lAdFrKA6IXUNxQOwaygMi11AgELeGEoGoNZQIRK2hSCBmDWUCEWsoFIhXQ6FAvBpKBaLVUCwQq4Zcf17XHpwa5lwf+7YISg2zEdPn2m2CUUNYcyua4l/DHI7ciKb41xA+Bd+hxr+GmewLaHxrWMCe+xNorfGpYQYH2Tdole41PAEM5fuM2XSr4Rjgfck9drvs3Ws4nkF2WIqv37+c3f5EptTNFvMp96hdsk1aV+UzaV2VRfvJ54h1VY7Nz9LIdVVW9fNh9cyMXHfJ8CExFd0lu+/Hu5PSVenv4E4Xe+8eZQiz8omaJ6q7ZHVcfG7P+02Kuj8PTWa8enB2PwAAAABJRU5ErkJggg==";
        let btnedit = document.createElement('button')
        btnedit.style.background = "white"
        btnedit.appendChild(editimg);
        btnedit.onclick = () => {
            edditshowModal(e)
        }
        btnedit.style.marginLeft="5px"
        let btngetById = document.createElement("button")
        btngetById.innerHTML = "info"
        btngetById.onclick = () => {
            fgetByid(e.id)
        }
        btngetById.style.width="40px";
        btngetById.style.height="20px";
        delcheck.append(btndelete, btnedit, btngetById, checkbox)
        delcheck.style.gap = "10px"
        delcheck.style.width = "200px"
        delcheck.style.marginTop = "10px"
        delcheck.style.display="flex"
       delcheck.style.justifyContent="center";
       delcheck.style.placeItems="center"
       
        container.append(text, text1, delcheck)
        trchap.append(container)
        tarafichap.append(trchap)
        container.style.display = "flex"
        container.style.flexDirection = "column"
        container.style.alignItems = "center"
        container.style.width = "300px"
        container.style.height = "100px"
        if(e.status==true)
        {
            container.style.background = "rgb(61, 194, 61)";
        }
        if(e.status!=true)
        {
            container.style.background = "rgb(211, 61, 61)";
        }
        container.style.padding = "20px"

    })
}