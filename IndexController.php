<?php

namespace App\Http\Controllers\Api;

use App\Models\iblock_element;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Iblocks;
use App\Service\functions;
use Illuminate\Support\Facades\Cache;


class IndexController extends Controller
{
    public function __construct()
    {

    }


    /**
     * @OA\Get(
     * path="/api/index/{id}/{page}",
     *
     *  @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="number"
     *      )
     *   ),
     *   @OA\Parameter(
     *      name="page",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="number"
     *      )
     *   ),
     *   @OA\Response(
     *      response=200,
     *       description="catalog+els",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   )
     *)
     */
    public function index($id = 1, $page = 1)
    {
        $tree = (Iblocks::SectionGetList($id));
        $els = Iblocks::ElementsGetListByIblockId($id, 9, $page, false, []);
        $count = $els["count"];
        $cEls = $els["res"];

        $props = $id == 1 ? [] :Iblocks::getAllProps($id, true);
        $cTree = $tree;
        $deep = function (&$c, $id) use (&$cEls, &$deep) {
            foreach ($c as $key => $value) {
                if (is_numeric($key)) {
                    $deep($c[$key], $key);
                }
            }
            $c["sectionDetail"] = functions::getOpItem($id);
        };
        $deep($cTree[$id], $id);
        $kek[$id] = $cTree[$id];
        return ["count" => $count, "tree" => $kek, "props" => $props, "els" => $cEls];
    }
    
     public function filter($id = 1, $page = 1, Request $request)
    {
        $tree = (Iblocks::SectionGetList($id));
        //$where = $request->filter ? $request->filter : [];
        $where = ['param' => [],"range"=>[]];
        $where['param'] = $request->filter ?? [];

        $els = Iblocks::ElementsGetListByIblockId($id, 9, $page, [], $where);
        $count = $els["count"];
        $cEls = $els["res"];

        $props = Iblocks::getAllProps($id, true);
        $cTree = $tree;
        $deep = function (&$c, $id) use (&$cEls, &$deep) {
            foreach ($c as $key => $value) {
                if (is_numeric($key)) {
                    $deep($c[$key], $key);
                }
            }
            $c["sectionDetail"] = functions::getOpItem($id);
        };
        $deep($cTree[$id], $id);
        $kek[$id] = $cTree[$id];
        return ["count" => $count, "tree" => $kek, "props" => $props, "els" => $cEls];
    }
    
    public function index2($str = ""){
        $search_term = $str;

$my_query = "select *, MATCH (name) AGAINST (?) from iblock_elements 
    where MATCH (name) AGAINST (? IN BOOLEAN MODE) limit 10 OFFSET ?";

$hobbies = \DB::select($my_query, array($search_term, $search_term, ((0)*10)));
        foreach($hobbies as $el){
            $ids[] = $el->id;
        }
        return Iblocks::ElementsGetList($ids);
 
        return $hobbies;
        $els = iblock_element::all();
        foreach($els as $el){
            if(str_contains(mb_strtolower($el->name), mb_strtolower($str))){
                $ids[] = $el->id;
            }
        }
        return Iblocks::ElementsGetList($ids);
    }
    /**
     * @OA\Get(
     * path="/api/detail/{id}",
     *
     *  @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="number"
     *      )
     *   ),
     *   @OA\Response(
     *      response=200,
     *       description="el info",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   )
     *)
     */
    public function detail($id)
    {
        return (Iblocks::ElementsGetList([$id])[0]);
    }

    public function speedtest(Request $request)
    {
        $a = microtime(true);

        $data = \DB::select( \DB::raw($request->sql));
        $b = microtime(true);
        return['data'=>$data, 'time'=>(($b - $a) * 1000)];

    }
    
    public function getidbyslug(Request $request)
    {
        
        return iblock_element::where('slug', '=', $request->slug)->first()->id;

    }

    

}