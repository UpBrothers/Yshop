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

# 3. Login(로그인)

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

# 4. StoreInfo (스토어정보) - 구매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*URL|URL|www.yshop/cutomer/mingkey -> mingkey

>- 응답

|변수명|설명|
|------|---|
|shopName|스토어 이름
|shopEmail|스토어 이메일
|businessNo|사업자번호
|shopPhone|스토어 전화번호
|shopAddress|스토어 주소

# 5. CategoryInfo (카테고리정보) - 구매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey

>- 응답
>   > 카테고리 정렬 순서대로 응답

|변수명|설명|
|------|---|
|gorupName1|그룹 대분류 이름
|gorupName2|그룹 중분류 이름
|gorupName3|그룹 소분류 이름


# 6. ProductList (상품조회) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey

>- 응답

|변수명|설명|
|------|---|
|productPK|상품 고유번호
|name|상품 이름
|price|상품 가격
|stock|상품 재고수량 (모든 옵션 포함)
|status|판매 상태
|registrationDate|등록일자
|groupPk1|그룹 대분류 고유번호
|gorupName1|그룹 대분류 이름
|gorupPk2|그룹 중분류 고유번호
|gorupName2|그룹 중분류 이름
|groupPK3|그룹 소분류 고유번호
|gorupName3|그룹 소분류 이름

# 7. RemoveProduct (상품 삭제) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*productPK|상품 고유번호|3

>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 8. CategoryList (카테고리정보) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey

>- 응답

|변수명|설명|
|------|---|
|gorupName1|그룹 대분류 이름
|gorupName2|그룹 중분류 이름
|gorupName3|그룹 소분류 이름

# 9. AddCategory (카테고리 등록) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*list [ (1) 대분류, (1) 중분류, (1) 소분류]|카테고리 명 (대분류, 중분류, 소분류) - 상위 분류 입력해야지 하위 분류 입력가능|[의류, 상의, 티셔츠], [의류, 상의], [의류]|

>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 10. AddCategory (카테고리 등록) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*list [ (1) 대분류, (1) 중분류, (1) 소분류]|카테고리 명 (대분류, 중분류, 소분류) - 상위 분류 입력해야지 하위 분류 입력가능|[의류, 상의, 티셔츠], [의류, 상의], [의류]|

>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 11. BenefitsList (혜택 정보) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey

>- 응답

|변수명|설명|
|------|---|
|discountPK|할인정보 고유번호
|discountName|할인 이름
|flag|할인 대상(전체, 그룹별, 상품)
|target|할인 대상 고유번호
|dcRate|할인률
|startDate|할인 시작일
|endDate|할인 마감일


# 12. AddBenefits (혜택 등록) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey|
|*discountName|할인 명|3
|*flag|할인 범위|1, 2, 3, 4 (대분류, 중분류, 소분류, 상품별)
|(1) target1|그룹 고유번호|3
|(1) target2|상품 고유번호|4
|*dcRate|할인률|5
|*startDate|할인 시작일|2020-10-12
|*endDate|할인 마감일|2020-10-12


>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 13. RemoveBenefits (혜택 삭제) - 판매자

>- API URL :　
>- 요청

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*discountPK|혜택 고유번호|3

>- 응답

|성공|실패|
|------|---|
|Success|Fail