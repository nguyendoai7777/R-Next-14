'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

let theme = createTheme({
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: '#515151',
				},
				root: {
					[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: '#a7a7a7',
					},
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#1ED760',
          },
          [`& .MuiInputBase-input`]: {
            color: '#f1f1f1',
          },
          [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#F44336 !important',
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            transition: '.2s',
          },
				
				},
			},
		},
	},
});
theme = createTheme(theme, {
	palette: {
		spotx: theme.palette.augmentColor({
			color: {
				main: '#1ED760'
			},
			name: 'spotx',
		}),
	},
});
function UseRootTheme(props: any) {
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
export default UseRootTheme;
