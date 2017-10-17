##　获取所有可领取优惠券

* /api/app-auth/v2/allOnlineCoupon  method: GET

## 获取该商品对应的可领取的优惠券

* /api/app-auth/v2/allGoodsCoupon  method: POST

```
body:
{
  discountStrategy: 'xxxxxxx'   // 商品对应字段的discountStrategy的_id
}
```

## 获取我的优惠券

* /api/app-auth/v2/myCoupons  method: GET

## 添加优惠券

* /api/app-auth/v2/addCoupon  method: POST

```
body:
{
  couponId: 'xxxxxx'   // 优惠券的Id
}
```