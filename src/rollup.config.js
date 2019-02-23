import resolve from 'rollup-plugin-node-resolve'
import execute from 'rollup-plugin-execute'

var dist = '../dist'
var input = `js/main.js`

var output = {
	file: `${dist}/js/main.js`,
	format: 'iife'
}

var options = {
	execute: [
		`gsed -i 's/app\$1/app/g' ${output.file} 2>/dev/null || sed -i 's/app\$1/app/g' ${output.file} || echo "Error, unable to ammend build file!"`
	],
	files: [`CNAME`, `index.html`],
	dirs: ['css', 'img'],
	resolve: {}
}

options.files
	.forEach(file => options.execute.push(`cp ${file} ${dist}`))

options.dirs
	.forEach((dir) => {
		var path = `${dist}/${dir}`
		options.execute.push(...[`test -d "${path}" && rm -rf "${path}/*" || mkdir "${path}"`, `cp -R ${dir}/* ${path}` ])
	})

var plugins = [
	resolve(options.resolve),
	execute(options.execute),
]

export default { input, output, plugins }
