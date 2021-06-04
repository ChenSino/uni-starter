//脚本文件目录 __dirname
//运行脚本的目录，即：项目的目录 process.cwd()

//配置文件
const fs = require('fs'),
	Hjson = require('hjson'),
	config = Hjson.rt.parse(fs.readFileSync(__dirname+'/config.js', 'utf-8'))


if(process.argv[2] == 'change'){
	change(config)
}else{
	recovery(config)
}

function change(config){
	for (let fileName in config) {
		let path = process.cwd() + fileName
		let copyPath = __dirname + '/copy' + fileName
		let fileText = fs.readFileSync(path, 'utf-8')
		//保持原文件名先备份一份到脚本目录下
		writeFileRecursive(copyPath, fileText, function(err) {
			if (err) {
				return console.log(err);
			}
			//改写
			let HfileObj = Hjson.rt.parse(fileText)
			mergeJSON(HfileObj,config[fileName])
			fs.writeFile(path, Hjson.rt.stringify(HfileObj, {
				quotes: 'all',
				separator: true,
				multiline: "off",
				bracesSameLine: true
			}), function(err) {
				if (err) {
					return console.log(err);
				}
			})
		})
	}
}




function recovery(){
	let paths = Object.keys(config)
	console.log(paths);
	paths.forEach(path=>{
		console.log(__dirname + '/copy' + path);
		let oldFile = fs.readFileSync(__dirname + '/copy' + path)
		console.log(process.cwd() + path);
		fs.writeFile(process.cwd() + path, oldFile, function(err) {
			if (err) {
				console.log(err);
				return
			}
			// fs.unlinkSync(__dirname + path+'.lock')
		})
	})
}






//创建目录并写入文件
function writeFileRecursive(path, buffer, callback) {
	let lastPath = path.substring(0, path.lastIndexOf("/"));
	fs.mkdir(lastPath, {
		recursive: true
	}, (err) => {
		if (err) return callback(err);
		fs.writeFile(path, buffer, function(err) {
			if (err) return callback(err);
			return callback(null);
		});
	});
}

//递归合并,为了保留注释内容
function mergeJSON(minor, main) {
	for (var key in main) {
		if (typeof(main[key]) != 'object' ) {
			minor[key] = main[key];
		}else{
			mergeJSON(minor[key], main[key]);
		}
	}
}