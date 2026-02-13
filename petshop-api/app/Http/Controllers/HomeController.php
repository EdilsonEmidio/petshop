<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class HomeController extends Controller
{


  public function index()
  {

    $products = Product::all();

    return $products;
  }

  public function search(Request $Request){

    $data = $Request->validate([
      'parametro' => 'nullable|string'
    ]);
    if($data['parametro']){
      $products = Product::where('name','LIKE','%'.$data['parametro'].'%')->get();
    }else{
      $products = Product::all();
    }
    return $products;
  }
  public function buy(Request $Request){
    
    $data = $Request->validate([
      'id_product' => 'required|integer'
    ]);
    
    $user = $Request->user();

    $order = Order::firstOrCreate(['id_user' => $user->id],
    ['id_user' => $user->id]);
  
    //$order = Order::where('id_user', $user->id)->first();

   
    if(!OrderItem::where('id_product',$data['id_product'])
      ->where('id_order',$order->id)->exists()){

      $orderItem = OrderItem::create([
        'id_order' => $order->id,
        'id_product' => $data['id_product'],
        'quantity' => 1
      ]);

    }else{

      $orderItem = OrderItem::where('id_product',$data['id_product'])->where('id_order',$order->id)->first();

      $orderItem->quantity += 1;
      $orderItem->save();
    }
    return response()->json(['message' => 'Produto adicionado ao carrinho com sucesso']);
  }

  public function yourProducts(Request $Request){

    $user = $Request->user();

    $order = Order::where('id_user', $user->id)->first();

    if(!$order){
      return [];
    }

    $orderItems = OrderItem::where('id_order', $order->id)->get();

    $quantTotal = 0;
    $precoTotal = 0;
    
    $products = [];
    
    foreach($orderItems as $item){
      
      $product = Product::find($item->id_product);
      $precoTotal += $item->quantity * $product->price;

      for($i=0; $i < $item->quantity; $i++){
        $quantTotal += 1;
        
        $products[] = $product;
      }
    }
    $dados = ['quantTotal'=> $quantTotal,'precoTotal'=> $precoTotal];
    return [$dados, $products];
  }
  //
  //
  public function removeProduct(Request $Request){

    $data = $Request->validate([
      'id_product' => 'required|integer'
    ]);

    $user = $Request->user();

    $order = Order::where('id_user', $user->id)->first();

    if(!$order){
      return response()->json(['message' => 'Nenhum pedido encontrado'], 404);
    }

    $orderItem = OrderItem::where('id_order', $order->id)
                          ->where('id_product', $data['id_product'])
                          ->first();

    if(!$orderItem){
      return response()->json(['message' => 'Produto não encontrado no carrinho'], 404);
    }

    if($orderItem->quantity > 1){
      $orderItem->quantity -= 1;
      $orderItem->save();
    }else{
      $orderItem->delete();
    }

    return response()->json(['message' => 'Produto removido do carrinho com sucesso']);
  }
}
