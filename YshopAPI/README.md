# 1. Registration(회원가입)

>- API URL :　
>- 요청 (POST)

  
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

# 2. Check(중복확인)

>- API URL :　
>- 요청 (POST)

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
>- 요청 (POST)

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
>- 요청 (GET)

|변수명|설명|ex|
|------|---|---|
|*URL|URL|www.yshop/cutomer/mingkey -> mingkey

>- 응답

||변수명|설명|
|--|------|---|
|storeinfo|name|스토어 대표자 명
||shopName|스토어 이름
||shopEmail|스토어 이메일
||image|스토어 이미지
||businessNo|사업자번호
||shopPhone|스토어 전화번호
||shopAddress|스토어 주소
||description|스토어 설명
|categoryinfo|gorupName1|그룹 대분류 이름
||gorupName2|그룹 중분류 이름
||gorupName3|그룹 소분류 이름


# 5. CategoryInfo (카테고리정보) - 구매자

>- API URL :　
>- 요청 (GET)

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
>- 요청 (GET)

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
>- 요청 (POST)

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
>- 요청 (GET)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey

>- 응답

|변수명|설명|
|------|---|
|groupPK1|그룹 대분류 이름
|gorupName1|그룹 대분류 이름
|groupPK2|그룹 중분류 이름
|gorupName2|그룹 중분류 이름
|groupPK3|그룹 소분류 이름
|gorupName3|그룹 소분류 이름

# 9. AddCategory (카테고리 등록) - 판매자

>- API URL :　
>- 요청 (POST)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*list [ (1) 대분류, (1) 중분류, (1) 소분류]|카테고리 명 (대분류, 중분류, 소분류) - 상위 분류 입력해야지 하위 분류 입력가능|[의류, 상의, 티셔츠], [의류, 상의], [의류]|

>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 10. RemoveCategory(카테고리 삭제) - 판매자

>- API URL :　
>- 요청 (POST)

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
>- 요청 (GET)

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
>- 요청 (POST)

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
>- 요청 (POST)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*discountPK|혜택 고유번호|3

>- 응답

|성공|실패|
|------|---|
|Success|Fail

# 14. ShowProductList(상품 목록 전체) - 구매자

>- API URL :　
>- 요청 (GET)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey

>- 응답

|변수명|설명|
|------|---|
|productPK|상품 고유번호
|name|상품 명
|price|상품 가격
|status|판매 상태
|views|조회 수
|thumbnail|상품 썸네일
|registrationDate|상품 등록일
|star|상품 평균 별점
|count|상품 후기 수
|likecount|상품 좋아요 수
|stock|상품 재고수
|dcRate|할인률

# 15. ProductInfo(상품 상세보기) - 구매자

>- API URL :　
>- 요청 (GET)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*productPK|상품 고유번호|1

>- 응답

|변수명|||설명|실패|
|:--:|-|--|---|--|
|result|Product_Info_View|productPK|상품 고유번호|Fail
|||name|상품 명
|||price|상품 가격
|||status|판매 상태
|||views|조회 수
|||thumbnail|상품 썸네일
|||image1|상품 본문 이미지 1
|||image2|상품 본문 이미지 2
|||image3|상품 본문 이미지 3
|||registrationDate|상품 등록일
|||star|상품 평균 별점
|||count|상품 후기 수
|||likecount|상품 좋아요 수
|||stock|상품 재고수
|||dcRate|할인률
||Option|stockPK|옵션 고유 번호
|||productPK|상품 고유번호
|||option1PK|1번째 옵션
|||option2PK|2번째 옵션
|||option3PK|3번째 옵션
|||stock|해당 옵션 재고 수
|||extraCharge|해당 옵션 추가 금액
||Review|purchasePK|구매 고유 번호
|||ID|후기 등록 고객 아이디
|||title|후기 제목
|||context|후기 본문
|||image|후기 이미지(없으면:null)
|||star|별 점
|||registrationDate|후기 등록일
||QnA|ID|문의 등록 고객 아이디
|||productPK|상품 고유 번호
|||title|문의 제목
|||context|문의 본문
|||registrationDate|문의 등록일
|||answer|문의 답변 내용
|||answerDate|문의 답변 일
|||flage|문의 종류(0: 상품문의, 1: 제고문의, 2: 배송문의)


# 16. ProductInfo(상품 상세보기) - 판매자

>- API URL :　
>- 요청 (GET)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*productPK|상품 고유번호|1

>- 응답

|변수명|||설명|실패|
|:--:|-|--|---|--|
|result|Product_Info_View|productPK|상품 고유번호|Fail
|||name|상품 명
|||price|상품 가격
|||status|판매 상태
|||views|조회 수
|||thumbnail|상품 썸네일
|||registrationDate|상품 등록일
|||star|상품 평균 별점
|||count|상품 후기 수
|||likecount|상품 좋아요 수
|||stock|상품 재고수
|||dcRate|할인률
||Option|stockPK|옵션 고유 번호
|||productPK|상품 고유번호
|||option1PK|1번째 옵션
|||option2PK|2번째 옵션
|||option3PK|3번째 옵션
|||stock|해당 옵션 재고 수
|||extraCharge|해당 옵션 추가 금액
||Product_Group_View|purchasePK|구매 고유 번호
|||groupPK1|대분류 고유 번호
|||groupName1|대분류 이름
|||groupPK1|중분류 고유 번호
|||groupName1|중분류 이름
|||groupPK1|소분류 고유 번호
|||groupName1|소분류 이름

# 17. AddProduct(상품 등록) - 판매자

>- API URL :　
>- 요청 (GET)

|변수명||설명||ex|
|:---:|----|----|-----|----|
|*schema||스키마 명||www.yshop/cutomer/mingkey -> mingkey
|*name||상품 명||쫀쫀한 반팔티
|*price||상품 가격||19900
|*thumbnail||상품 썸네일 이미지 URL||www.s3.test/test.png
|*image[]||상품 본문 이미지 URL(최소 1장, 최대 3장)||www.s3.test/test.png
|*option[]||상품 옵션 명(최소 0개, 최대 3개)||색상, 사이즈, 길이
|*registration||상품 등록일||2021-05-21
|*status||상품 판매 상태||1 (판매 중), 0 (판매 중단 or 품절), -1(삭제된 상품)
|*optionstock[]|*option[]|옵션 경우의 수|옵션 선택|[블랙, L], [화이트, M]
|||*stock||해당 옵션 재고 수|50
|||*extraCharge||해당 옵션 추가 금액|5000
|*list [ (1) 대분류, (1) 중분류, (1) 소분류]||카테고리 명 (대분류, 중분류, 소분류) - 상위 분류 입력해야지 하위 분류 입력가능||[의류, 상의, 티셔츠],[의류, 상의],[의류]

<br>

>- 요청 예시

{<br>
    　"schema" : "shop_template",<br>
    　"name" : "안녕",<br>
    　"price" : "90000",<br>
    　"thumbnail" : "www",<br>
    　"image" : ["naver"],<br>
    　"option" : ["색상","사이즈"],<br>
    　"registration" : "2021-07-30",<br>
    　"status" :"1",<br>
    　"optionstock" : [<br>
        　　{<br>
        　　　"option" : ["블랙","L"],<br>
        　　　"stock" : "50",<br>
        　　　"extraCharge" : "50"<br>
        　　},<br>
        　　{<br>
        　　　"option" : ["파랑","M"],<br>
        　　　"stock" : "100",<br>
        　　　"extraCharge" : "9000"<br>
        　　},<br>
        　　{<br>
        　　　"option" : ["보라","S"],<br>
        　　　"stock" : "190",<br>
        　　　"extraCharge" : "900"<br>
        　　},<br>
        　　{<br>
        　　　"option" : ["빨강","L"],<br>
        　　　"stock" : "110",<br>
        　　　"extraCharge" : "100"<br>
        　　}<br>
    　],<br>
    　"list" : ["의류","하의","청바지"]<br>
}<br>


>- 응답

|성공|실패|
|------|---|
|Success|Fail


# 18. Find (아이디, 비밀번호 찾기) - 구매자, 판매자

>- API URL :　
>- 요청 (POST)

||변수명|설명|ex|
|-|------|---|---|
||*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
||*from|판매자, 구매자 구분|seller or customer
||*flag|아이디 찾기, 비밀번호 찾기 구분|ID or PW
|(1) 중 하나 선택|(1) name|회원 이름(아이디 찾기 일 때 선택)|김철수
||(1) ID|회원 아이디(비밀전호 찾기 일 때 선택)|dsfw
||*key|(2) 중 하나 선택|phone or email
|(2) 중 하나 선택|(2) phone|회원 전화번호(전화번호로 찾기 일 때  선택)|010-2222-2222
||(2) email|회원 이메일(이메일로 찾기 일 때  선택)|qwer@naver.com

>- 응답

|구분|찾은 경우|못 찾은 경우|
|------|----|----|
|아이디 찾기|해당 아이디|[]
|비밀번호 찾기|cnt = 1|cnt = 0

# 19. ModifyPW (비밀번호 수정) - 구매자, 판매자

>- API URL :　
>- 요청 (POST)

|변수명|설명|ex|
|------|---|---|
|*schema|스키마 명|www.yshop/cutomer/mingkey -> mingkey
|*from|판매자, 구매자 구분|seller or custome*r
|*ID|회원 아이디|kmg
|*PW|변경 할 비밀번호|werf12343

>- 응답

|성공|실패|
|------|---|
|Success|Fail