import 'package:asmaul_husna_list/model/api_response.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiClient {
  static Future<List<EntityModel>> getAllAsmaulHusna() async {
    Uri url = Uri.parse("https://asmaul-husna-api.vercel.app/api/all");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var responseDecode = json.decode(response.body);
      List getData = responseDecode['data'];
      return getData.map((e) => EntityModel.fromJson(e)).toList();
    }else {
      throw Exception("Data not found");
    }
  }
}
