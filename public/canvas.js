let obj = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
        },
        json = JSON.stringify(obj);

let canvas = document.createElement("canvas");
canvas.width = 128;
canvas.height = 128;
canvas.id = "icon";

let ctx = canvas.getContext("2d"),
        data = ctx.getImageData(0, 0, 128, 128).data,
        imgd = ctx.createImageData(128, 128);

let arr = data.map((e, i) => {
        if(json[i] !== null && json[i] !== void 0) {
                return json.charCodeAt(i);
        }
});
imgd.data.set(arr);
ctx.putImageData(imgd, 0, 0);

document.body.appendChild(canvas);