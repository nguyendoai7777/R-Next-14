import loaderUtils from 'loader-utils';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const hashOnlyIdent = (context, _, exportName) =>
	'__' +
	loaderUtils
		.getHashDigest(Buffer.from(`filePath:${path.relative(context.rootContext, context.resourcePath).replace(/\\+/g, '/')}#className:${exportName}`), 'md4', 'base64', 8)
		.replace(/[^a-zA-Z0-9-_]/g, '_')
		.replace(/^(-?\d|--)/, '_$1');

/** @type {import('next').NextConfig} */

const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack(config, { dev }) {
		const rules = config.module.rules.find((rule) => typeof rule.oneOf === 'object').oneOf.filter((rule) => Array.isArray(rule.use));
		/* if(!dev) {
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (moduleLoader.loader?.includes('css-loader') && !moduleLoader.loader?.includes('postcss-loader')) {
            if(moduleLoader.options.modules && moduleLoader.options.modules.getLocalIdent) {
              moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
            }
          }
        });
      });
    } */
		rules.forEach((rule) => {
			rule.use.forEach((moduleLoader) => {
				if (moduleLoader.loader?.includes('css-loader') && !moduleLoader.loader?.includes('postcss-loader')) {
					if (moduleLoader.options.modules && moduleLoader.options.modules.getLocalIdent) {
						moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
					}
				}
			});
		});
		return config;
	},
};

export default nextConfig;
