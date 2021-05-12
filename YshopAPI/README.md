# 1. Registration(회원가입)

>- API URL :　
>- 요청

  
>   > - 판매자 

|변수명|설명|ex|
|------|---|---|
|*from|판매자 or 구매자 구분|seller|
|*ID|아이디|qwer12
|*PW|비밀번호|mingi99
|*name|이름|김철수
|*phone|전화번호|010-1111-2222
|*email|이메일|wer32@naver.com
|*shopName|스토어명|밍키
|*URL|스토어주소|mingkey
|*businessNo|사업자번호|0029391
|*shopEmail|스토어이메일|wer32@naver.com
|*shopPhone|스토어전화번호|010-1111-2222
|*shopAddress|스토어주소|경상북도 경산시


>   > - 구매자

|변수명|설명|ex|
|------|---|---|
|*from|판매자 or 구매자 구분|seller
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*ID|아이디|qwer12
|*PW|비밀번호|mingi99
|*name|이름|김철수
|*phone|전화번호|010-1111-2222
|*email|이메일|wer32@naver.com
|*birthdate|생년월일|1999-05-24 ( ‘-’ 붙이기)
|*gender|성별|1 (남자), 0 (여자)
|*address|주소|경상북도 경산시

>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 2. Registration(회원가입)

>- API URL :　
>- 요청

>   >   - 판매자 

|변수명|설명|ex|
|------|---|---|
|*from|판매자 or 구매자 구분|seller
|*key|(1) 중 1개의 변수명|ID or email.....
|(1) ID|아이디|qwer12
|(1) phone|전화번호|010-1111-2222
|(1) email|이메일|wer32@naver.com
|(1) shopName|스토어 명|밍키
|(1) URL|스토어 주소|mingkey
|(1) businessNo|사업자 번호|0029391
|(1) shopEmail|스토어이 메일|wer32@naver.com
|(1) shopPhone|스토어 전화번호|010-1111-2222

>   > - 구매자

|변수명|설명|ex|
|------|---|---|
|변수명|설명|ex
|*from|판매자 or 구매자 구분|seller
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*key|(1) 중 1개의 변수명|ID or email.....
|(1) ID|아이디|qwer12
|(1) phone|전화번호|010-1111-2222
|(1) email|이메일|wer32@naver.com

>- 응답

|가입 가능(중복 없음)|가입 불가능(중복 있음)|
|------|---|
|cnt : 0|cnt : 1|

# 2. Registration(회원가입)

>- API URL :　
>- 요청

>   > - 판매자, 구매자

|변수명|설명|ex|
|------|---|---|
|*from|판매자 or 구매자 구분|seller
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*ID|아이디|qwer12
|*PW|비밀번호|mingi99

>- 응답

>   > - 판매자

|로그인 성공|로그인 실패|
|------|---|
|URL : URL|[] - 빈 객체|

>   > - 구매자

|로그인 성공|로그인 실패|
|------|---|
|ID : 해당 아이디|Fail|