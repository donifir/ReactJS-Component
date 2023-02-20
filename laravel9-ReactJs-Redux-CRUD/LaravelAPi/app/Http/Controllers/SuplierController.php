<?php

namespace App\Http\Controllers;

use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SuplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $supliers = Suplier::orderBy('id', 'desc')->get();
        $response = [
            "success" => true,
            "message" => "Data Suplier",
            "data" => $supliers,
            "reasponse" => Response::HTTP_OK,
        ];
        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator=Validator::make($request->all(),[
            'nama_suplier'=>['required'],
            'alamat_suplier'=>['required'],
            'telp_suplier'=>['required'],
        ]);
        if ($validator->fails()) {
            $response=[
                'success'=>false,
                'message'=>$validator->errors(),
                'data'=>'',
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $barang =Suplier::create([
                'nama_suplier' => $request->nama_suplier,
                'alamat_suplier' => $request->alamat_suplier,
                'telp_suplier' => $request->telp_suplier
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => $barang
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $suplier=Suplier::find($id);
        $response=[
            'success'=>true,
            'message'=>'suplier detail',
            'data'=>$suplier,
        ];
        return response()->json($response, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $barang = Suplier::findOrFail($id);
        $validator=Validator::make($request->all(),[
            'nama_suplier'=>['required'],
            'alamat_suplier'=>['required'],
            'telp_suplier'=>['required'],
        ]);
        if ($validator->fails()) {
            $response=[
                'success'=>false,
                'message'=>$validator->errors(),
                'data'=>'',
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $barang->update([
                'nama_suplier' => $request->nama_suplier,
                'alamat_suplier' => $request->alamat_suplier,
                'telp_suplier' => $request->telp_suplier
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => $barang
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $suplier = Suplier::findOrFail($id);
        $suplier->delete();
        $response = [
            'message' => 'data berhasil terhapus',
            'data' => ''
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
