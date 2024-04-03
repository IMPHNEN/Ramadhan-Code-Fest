import 'package:asmaul_husna_list/client/api_client.dart';
import 'package:asmaul_husna_list/model/api_response.dart';
import 'package:asmaul_husna_list/widgets/card_view.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  EntityModel model = EntityModel();
  late Future<List<EntityModel>> listData;

  @override
  void initState() {
    listData = ApiClient.getAllAsmaulHusna();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Asmaul Husna List",
          style: GoogleFonts.inter(fontWeight: FontWeight.w600),
        ),
      ),
      body: Container(
        margin: const EdgeInsets.all(12),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.search),
                  label: Text(
                    "Search",
                    style: GoogleFonts.inter(),
                  ),
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12))),
            ),
            const SizedBox(
              height: 12,
            ),
            Expanded(
                child: FutureBuilder(
              future: listData,
              builder: ((context, snapshot) {
                if (snapshot.hasError) {
                  return Text("${snapshot.error}");
                } else if (snapshot.hasData) {
                  List<EntityModel> data = snapshot.data!;
                  return GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        mainAxisExtent: 230,
                      ),
                      shrinkWrap: true,
                      itemCount: data.length,
                      itemBuilder: (context, index) {
                        return CardView(index: index, data: data);
                      });
                } else {
                  return const Center(
                    child: CircularProgressIndicator(
                      color: Color(0xFF00FFB3),
                    ),
                  );
                }
              }),
            ))
          ],
        ),
      ),
    );
  }
}
