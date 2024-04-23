function ErrorText({children}: any) {
  return <div className='text-xs text-[#F44336] h-[22px]' style={{lineHeight: '22px'}}>
    {children}
  </div>
}
export default ErrorText;