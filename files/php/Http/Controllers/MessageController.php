<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function getMessages(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $messages = Message::where(function ($query) use ($from, $to) {
            $query->where('from', $from)
                  ->where('to', $to);
        })->orWhere(function ($query) use ($from, $to) {
            $query->where('from', $to)
                  ->where('to', $from);
        })->orderBy('created_at', 'asc')->get();


    // $projectedMessages = $messages->map(function ($msg) use ($from) {
    //     return [
    //         'fromSelf' => $msg->from == $from,
    //         'message' => $msg->text,
    //     ];
    // });

    return response()->json($messages);
    }

    public function addMessage(Request $request)
    {
        $message = new Message;
        $message->text = $request->input('text');
        $message->from = $request->input('from');
        $message->to = $request->input('to');
        $message->save();

        return response()->json(['success' => 'Message added successfully.', 'message' => $message ]);
    }
}