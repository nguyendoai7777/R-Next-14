type CookieKey<T> = T extends object ? keyof T : string;

export function useCookiesParser<CookiesShape>() {
	const target: Record<string, any> = {};

	const updateValue = () => {
		const ck = document.cookie;
		if (!ck) {
			return null;
		}
		const list = document.cookie.split(';');
		list.forEach((str) => {
			const id = str.indexOf('=');
			const key = str.slice(0, id);
			const value = str.slice(id + 1, str.length);
			Object.assign(target, { [key]: value });
		});
	};
	updateValue();
	return {
		getAll: () => {
			return target;
		},
		get: (key: CookieKey<CookiesShape>) => {
			// @ts-ignore
			return target[key] ? (target[key] as string) : null;
		},
		set: (key: string, value: string) => {
			updateValue();
			const update = (set = false) => {
				const tg: string[] = [];
				if (set) {
					target[key] = value;
				}
				Object.keys(target).forEach((c) => {
					tg.push(`${c}=${target[c]}`);
				});
				if (!set) {
					tg.push(`${key}=${value}`);
				}
				return tg.join('; ');
			};
			if (key in target) {
				console.log('set in: ');
				document.cookie = update(true);
			} else {
				console.log('set new: ', update());
				document.cookie = update();
			}
		},
		remove(key: CookieKey<CookiesShape>) {
      console.log('ua vao remove a: ', );
			updateValue();
			if (key in target) {
				// @ts-ignore
				delete target[key];
				if (Object.keys(target).length > 0) {
					const tg: string[] = [];
					Object.keys(target).forEach((c) => {
						tg.push(`${c}=${target[c]}`);
					});
					console.log('list: ', tg);
				} else {
					document.cookie = '';
				}
				console.log('Remove di: ', target, Object.keys(target).length);
				// document.cookie = update(true);
			} else {
				// const message = `key ${key} does not exist`
				console.error(`key %c${key as string}%c does not exist in cookie`, 'font-weight: bold; color: red', 'font-weight: normal');
				return;
				// document.cookie = update();
			}
		},
		clear() {
			document.cookie = '';
		},
	};
	// const map = document.cookie.split('');
}
