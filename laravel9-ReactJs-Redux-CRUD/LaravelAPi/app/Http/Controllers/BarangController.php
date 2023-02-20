<?php

namespace App\Http\Controllers;

use App\Http\Resources\BarangResource;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;



class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $barang = Barang::orderBy('id', 'desc')->get();
        $response = [
            'success' => true,
            'message' => 'list data barang terbaru',
            'data' => BarangResource::collection($barang),
            'response'=>Response::HTTP_OK
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
        
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'harga' => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'keterangan' => ['required'],
            'gambar' => ['required'],
            'suplier_id' => ['required'],
        ]);


        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => ''
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $file = $request->file('gambar');
            $imageName =Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'),$imageName);


            $barang =Barang::create([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier_id,
                'gambar' => $imageName,
                // 'gambar' => $request->gambar,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => new BarangResource($barang)
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
        $barang = Barang::Find($id);
        $response = [
            'success' => true,
            'message' => 'list data barang terbaru',
            'data' => new BarangResource($barang)
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
        $barang = Barang::find($id);
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'harga' => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'keterangan' => ['required'],
            'gambar' => ['required'],
            'suplier_id' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => ''
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $file = $request->file('gambar');
            $imageName =Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'),$imageName);

            $barang->update($request->all());
            $barang->update([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier_id,
                // 'gambar' => $request->gambar,
                'gambar' => $imageName,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaction Updated',
                'data'    => new BarangResource($barang)
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
        $barang = Barang::findOrFail($id);
        $barang->delete();
        $response = [
            'message' => 'data berhasil terhapus',
            'data' => ''
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
