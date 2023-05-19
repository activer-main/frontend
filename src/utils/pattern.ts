export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const EMAIL_HELPERTEXT = '請輸入有效的電子郵件地址';
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PASSWORD_HELPERTEXT = '密碼必須包含至少一個小寫字母、一個大寫字母、一個數字和一個特殊字符（!@#$%），並且長度在8到24個字符之間。';
export const USERNAME_PATTERN = /^[\u4E00-\u9FFFa-zA-Z0-9]{2,16}$/;
export const USERNAME_HELPERTEXT = '使用者名稱須為2-16字中英數字';
export const PHONE_PATTERN = /^[0-9]{10}$/;
export const PHONE_HELPERTEXT = '電話欄位需為10位數字';
