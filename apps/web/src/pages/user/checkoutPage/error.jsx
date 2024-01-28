{/* cartdata disini */}
{cartData.result.map((val,id)=>{
    return <ProductCheckoutCard
    key={id}
    productName={val["product.name"]}
    productPrice={val["product.price"].toLocaleString("id")}
    qty={val.quantity}
    total_price={val.total_price.toLocaleString("id")}
    total_weightConvert={val.total_weightConvert}
    productWeightConvert={val.productWeightConvert}
    productImage={val["product.product_images.image"]}
    />

  })}

  {/* co payment disini */}
  <CheckoutPayment
  recepient={userData.fullname}
  address={userData["addresses.address"]}
  phone={userData["addresses.phone"]}
  city={userData.city}
  province={userData.province}
  price={cartData.checkoutPrice.toLocaleString("id")}
  />