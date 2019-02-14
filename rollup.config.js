import resolve from 'rollup-plugin-node-resolve'
import execute from 'rollup-plugin-execute'

var src = './src'
var dist = './dist'

var input = `${src}/js/main.js`

var output = {
	file: `${dist}/js/main.js`,
	format: 'iife'
}


var options = {
	execute: [
		`sed -i 's/app\$1/app/g' ${output.file}`
	],
	files: [`CNAME`, `index.html`],
	dirs: ['css'],
	resolve: {}
}

options.files
	.forEach(file => options.execute.push(`cp ${src}/${file} ${dist}`))

options.dirs
	.forEach((dir) => {
		var path = `${dist}/${dir}`
		options.execute.push(...[`test -d "${path}" && rm -rf "${path}/*" || mkdir "${path}"`, `cp -R ${src}/${dir}/* ${path}` ])
	})

var plugins = [
	resolve(options.resolve),
	execute(options.execute),
]

export default { input, output, plugins }